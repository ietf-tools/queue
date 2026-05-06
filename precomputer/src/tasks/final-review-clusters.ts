import { DateTime } from 'luxon'
import { uniq } from 'es-toolkit'
import { ClusterQueueCommonSchema, type ClusterQueueCommon, type ClusterIndexCommon, type QueueCommon } from '../../../website/app/utils/validators.ts'

type Props = {
  finalReviewIndex: QueueCommon,
  queueIndex: QueueCommon,
  clusterIndex: ClusterIndexCommon,
}

export const getFinalReviewClusters = ({
  finalReviewIndex,
  queueIndex,
  clusterIndex,
}: Props): ClusterQueueCommon[] => {
  const clusterNumbers = finalReviewIndex.items
    .flatMap(item => item.clusters)
    .filter(maybeCluster => typeof maybeCluster === 'number')
  const uniqueClusterNumbers = uniq(clusterNumbers)

  const finalReviewClusters = uniqueClusterNumbers.map((clusterNumber): ClusterQueueCommon => {
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

  const verifiedFinalReviewClusters = finalReviewClusters.map(finalReviewCluster => {
    // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
    return ClusterQueueCommonSchema.parse(finalReviewCluster)
  })

  return verifiedFinalReviewClusters
}