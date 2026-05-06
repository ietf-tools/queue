import { DateTime } from 'luxon'
import { uniq } from 'es-toolkit'
import { type ClusterIndexCommon, type ClusterPackageCommon, type QueueCommon } from '../../../website/app/utils/validators.ts'

type Props = {
  finalReviewIndex: QueueCommon,
  queueIndex: QueueCommon,
  clusterIndex: ClusterIndexCommon,
}

export const getFinalReviewClusters = ({
  finalReviewIndex,
  queueIndex,
  clusterIndex,
}: Props): QueueCommon[] => {
  const clusterNumbers = finalReviewIndex.items.flatMap(item => item.clusters)
  const uniqueClusterNumbers = uniq(clusterNumbers)

  return uniqueClusterNumbers.map((clusterNumber): QueueCommon => {
    const cluster = clusterIndex.list.find(clusterItemCommon =>
      clusterItemCommon.number === clusterNumber
    )
    if (!cluster) {
      const errorTitle = `Expected to find cluster ${clusterNumber} in clusterIndex`
      console.error(errorTitle, `but only had clusters ${clusterIndex.list.map(clusterItemCommon => clusterItemCommon.number).join(', ')}`)
      throw Error(errorTitle)
    }
    return {
      timestampIso: DateTime.now().toUTC().toISO(),
      clusterNumber,
      items: cluster.documents.map(clusterMember => {
        const draft = queueIndex.items.find(item => item.name === clusterMember.name)
        if (!draft) {
          const errorTitle = `Expected to find draft ${clusterMember.name} in queueIndex`
          console.error(errorTitle, `but only had drafts ${queueIndex.items.map(item => item.name).join(', ')}`)
          throw Error(errorTitle)
        }
        return draft
      })
    }
  })
}