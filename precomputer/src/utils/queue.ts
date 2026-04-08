import { DateTime } from 'luxon'
import { PurpleApi, type ApiPubqQueueListRequest } from "../../generated/purple_client/index.ts";
import { type QueueCommon, type QueueCommonItem, QueueCommonSchema, type BlockingReason } from '../../../website/app/utils/validators.ts'
import { assertIsString } from "../utils/typescript.ts";
import { parseApprovalLogMessages, parseDisposition, parseIanaStatus, parseLabels } from "../utils/converters.ts";
import { groupBy } from "es-toolkit";

type Props = {
  api: PurpleApi
  params?: ApiPubqQueueListRequest
}

type AssignmentsByRole = NonNullable<QueueCommonItem["assignmentsByRoles"]>[number]

export const getQueueCommon = async ({ api, params }: Props): Promise<QueueCommon> => {
  const list = await api.apiPubqQueueList(params)

  const queueCommon: QueueCommon = {
    generatedAtIso: DateTime.now().toISO(),
    items: list.map((queueItem): QueueCommonItem => {
      const {
        name,
        title,
        disposition,
        externalDeadline,
        labels,
        assignmentSet,
        blockingReasons: queueItemBlockingReasons,
        cluster,
        pages,
        enqueuedAt,
        ianaStatus,
        stream,
        authors,
        finalApproval: finalApprovals,
        approvalLogMessage: approvalLogMessages,
      } = queueItem
      assertIsString(name)
      assertIsString(title)

      const clusterNumber: number | undefined = cluster?.number ?? undefined

      const publicAssignments = assignmentSet ?? []

      const assignmentsByRole = Object.entries(groupBy(
        publicAssignments,
        (assignment) => assignment.role
      ))

      return {
        name,
        title,
        pages,
        stream,
        authors: authors.map(author => {
          const { titlepageName, isEditor } = author
          return {
            titlepageName,
            isEditor: Boolean(isEditor),
          }
        }),
        assignmentsByRoles: assignmentsByRole.map(([role]): AssignmentsByRole => {
          let blockingReasons: BlockingReason[] | undefined = undefined

          if (role === 'blocked' && queueItemBlockingReasons) {
            blockingReasons = queueItemBlockingReasons?.map(blockingReason => {
              if (!blockingReason.reason?.name) {
                return
              }
              return {
                reason: {
                  name: blockingReason.reason.name
                }
              }
            }).filter(blockingReason => blockingReason !== undefined) ?? undefined
          }

          return {
            role,
            blockingReasons,
          }
        }),
        clusters: typeof clusterNumber === 'number' ? [clusterNumber] : undefined,
        enqueuedAtIso: enqueuedAt?.toISOString(),
        deadlineIso: externalDeadline?.toISOString(),
        disposition: parseDisposition(disposition),
        ianaStatus: parseIanaStatus(ianaStatus),
        labels: parseLabels(labels),
        approvalLogMessages: parseApprovalLogMessages(approvalLogMessages),
        consensus: finalApprovals?.every(finalApproval => {
          return Boolean(finalApproval.approved)
        }) ?? false
      }
    })
  }

  // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
  const verifiedQueueCommon = QueueCommonSchema.parse(queueCommon)

  return verifiedQueueCommon
}