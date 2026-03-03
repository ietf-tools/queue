import { PurpleApi, type ApiPubqQueueListRequest } from "../../generated/purple_client/index.ts";
import { type QueueCommon, type QueueCommonItem, QueueCommonSchema } from '../../../website/app/utils/validators.ts'
import { assertIsString } from "../utils/typescript.ts";
import { parseDisposition, parseIanaStatus, parseLabels } from "../utils/converters.ts";

type Props = {
  api: PurpleApi
  params?: ApiPubqQueueListRequest
}

export const getQueueCommon = async ({ api, params }: Props): Promise<QueueCommon> => {
  const list = await api.apiPubqQueueList(params)

  const queueCommon: QueueCommon = {
    items: list.map((queueItem): QueueCommonItem => {
      const {
        name,
        title,
        disposition,
        externalDeadline,
        labels,
        cluster,
        pages,
        enqueuedAt,
        ianaStatus,
      } = queueItem
      assertIsString(name)
      assertIsString(title)
      const clusterNumber: number | undefined = cluster?.number ?? undefined

      return {
        name,
        title,
        pages,
        clusters: typeof clusterNumber === 'number' ? [clusterNumber] : undefined,
        enqueuedAtIso: enqueuedAt?.toISOString(),
        deadlineIso: externalDeadline?.toISOString(),
        disposition: parseDisposition(disposition),
        ianaStatus: parseIanaStatus(ianaStatus),
        labels: parseLabels(labels)
      }
    })
  }

  // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
  const verifiedQueueCommon = QueueCommonSchema.parse(queueCommon)

  return verifiedQueueCommon
}