import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type QueueCommon, type QueueCommonItem, QueueCommonSchema } from '../../../website/app/utils/validators.ts'
import { assertIsNumber, assertIsString } from "../utils/typescript.ts";
import { parseDisposition, parseIanaStatus, parseLabels } from "../utils/converters.ts";

type Props = {
  api: PurpleApi
}

export const getQueueCommon = async ({ api }: Props): Promise<QueueCommon> => {
  const list = await api.queueList()

  const queueCommon: QueueCommon = {
    items: list.map((queueItem): QueueCommonItem => {
      const {
        name,
        title,
        disposition,
        externalDeadline,
        labels,
        cluster,
        rfcNumber,
        pages,
        enqueuedAt,
        ianaStatus,
      } = queueItem
      assertIsString(name)
      assertIsString(title)
      assertIsNumber(pages)
      const clusterNumber: number | undefined = cluster?.number ?? undefined
      assertIsNumber(cluster)

      return {
        name,
        title,
        rfcNumber: rfcNumber ?? undefined,
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

  // This will throw on invalid, and it will remove additional props
  const verifiedQueueCommon = QueueCommonSchema.parse(queueCommon)

  return verifiedQueueCommon
}