import { groupBy, uniq } from 'es-toolkit'
import { DateTime } from 'luxon'
import { PurpleApi, type Cluster, type ApiPubqQueueListRequest } from '../../generated/purple_client/index.ts'
import {
  type QueueCommon,
  type QueueCommonItem,
  QueueCommonSchema,
  type BlockingReason
} from '../../../website/app/utils/validators.ts'
import { assertIsString } from '../utils/typescript.ts'
import {
  parseApprovalLogMessages,
  parseDisposition,
  parseIanaStatus,
  parseLabels,
  parseReferences
} from '../utils/converters.ts'
import { apiPubqClustersRetrieveCached, apiPubqQueueListCached } from './api.ts'

type Props = {
  api: PurpleApi
  params?: ApiPubqQueueListRequest
}

type AssignmentsByRole = NonNullable<QueueCommonItem['assignmentsByRoles']>[number]

type FinalApprovalCounts = NonNullable<Cluster["documents"]>[number]['finalApprovalCounts']

type FinalApprovalCountsByQueueItemName = Record<string, FinalApprovalCounts>

export const getQueueCommon = async ({ api, params }: Props): Promise<QueueCommon> => {
  const list = await apiPubqQueueListCached({ api, params })

  const uniqueClusterNumbers = uniq(list
    .map(queueItem => queueItem.cluster)
    .filter(maybeClusterNumber => typeof maybeClusterNumber === 'number')
  )

  const clusters = await Promise.all(
    uniqueClusterNumbers
      .map(
        clusterNumber => apiPubqClustersRetrieveCached({ api, clusterNumber })
      )
  )

  const finalApprovalCountsByQueueItemName = clusters.reduce((acc, cluster) => {
    const byName: FinalApprovalCountsByQueueItemName = (cluster.documents ?? []).reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: item.finalApprovalCounts
      }
    }, {} as FinalApprovalCountsByQueueItemName)

    return {
      ...acc,
      ...byName,
    }
  }, {} as FinalApprovalCountsByQueueItemName)

  console.log('[finalApprovalCountsByQueueItemName]', Object.keys(finalApprovalCountsByQueueItemName))

  const queueCommon: QueueCommon = {
    generatedAtIso: DateTime.now().toISO(),
    items: list.map((queueItem): QueueCommonItem => {
      const {
        name,
        title,
        disposition,
        rev,
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
        group,
        groupName,
        stdLevel,
        references,
        finalApproval: finalApprovals,
        approvalLogMessage: approvalLogMessages,
      } = queueItem
      assertIsString(name)
      assertIsString(rev)
      assertIsString(title)

      const clusterNumber: number | undefined = cluster?.number ?? undefined

      const finalApprovalCounts = finalApprovalCountsByQueueItemName[name]

      console.log(`[${name}] finalApprovalCounts: `, JSON.stringify(finalApprovalCounts))

      const publicAssignments = assignmentSet ?? []

      const assignmentsByRole = Object.entries(
        groupBy(publicAssignments, (assignment) => assignment.role)
      )

      return {
        name,
        rev,
        title,
        pages,
        stream,
        group,
        groupName: groupName ?? undefined,
        stdLevel,
        references: parseReferences(references),
        authors: authors.map((author) => {
          const { titlepageName, isEditor } = author
          return {
            titlepageName,
            isEditor: Boolean(isEditor)
          }
        }),
        assignmentsByRoles: assignmentsByRole.map(([role]): AssignmentsByRole => {
          let blockingReasons: BlockingReason[] | undefined = undefined

          if (role === 'blocked' && queueItemBlockingReasons) {
            blockingReasons =
              queueItemBlockingReasons
                ?.map((blockingReason) => {
                  if (!blockingReason.reason?.name) {
                    return
                  }
                  return {
                    reason: {
                      name: blockingReason.reason.name
                    }
                  }
                })
                .filter((blockingReason) => blockingReason !== undefined) ?? undefined
          }

          return {
            role,
            blockingReasons
          }
        }),
        clusters: typeof clusterNumber === 'number' ? [clusterNumber] : undefined,
        enqueuedAtIso: enqueuedAt?.toISOString(),
        deadlineIso: externalDeadline?.toISOString(),
        disposition: parseDisposition(disposition),
        ianaStatus: parseIanaStatus(ianaStatus),
        labels: parseLabels(labels),
        approvalLogMessages: parseApprovalLogMessages(approvalLogMessages),
        finalApprovals: finalApprovals?.map((finalApproval) => {
          const approverName = finalApproval.approver?.name
          if (!approverName) {
            throw Error('Expected approver name')
          }
          const approvedAtJSDate = finalApproval.approved
          const approvedAtIso = approvedAtJSDate
            ? DateTime.fromJSDate(approvedAtJSDate).toISO()
            : undefined

          return {
            approverName,
            approvedAtIso: approvedAtIso ?? undefined
          }
        }),
        finalApprovalCounts,
        consensus:
          finalApprovals?.every((finalApproval) => {
            return Boolean(finalApproval.approved)
          }) ?? false
      }
    })
  }

  // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
  const verifiedQueueCommon = QueueCommonSchema.parse(queueCommon)

  return verifiedQueueCommon
}
