import { PromisePool } from '@supercharge/promise-pool'
import { getClusterIndex } from './tasks/cluster-index.ts'
import { getCluster } from './tasks/cluster.ts'
import { getFinalReviewIndex } from './tasks/final-review-index.ts'
import { getQueue } from './tasks/queue.ts'
import { getApiClient } from './utils/api.ts'
import { CLUSTER_INDEX_PATH, clusterPathBuilder, FINAL_REVIEW_INDEX_PATH, QUEUE_INDEX_PATH, saveToS3 } from './utils/s3.ts'

type S3UploadTask = { key: string, contents: string }

const main = async (): Promise<void> => {
  const api = getApiClient()
  const [queueCommon, clusterIndex, finalReviewIndex] = await Promise.all([
    getQueue({ api }),
    getClusterIndex({ api }),
    getFinalReviewIndex({ api })
  ])
  const clusters = await Promise.all(clusterIndex.list.map((cluster) =>
    getCluster({ api, clusterNumber: cluster.number })
  ))

  const files: S3UploadTask[] = [
    { key: QUEUE_INDEX_PATH, contents: JSON.stringify(queueCommon) },
    { key: CLUSTER_INDEX_PATH, contents: JSON.stringify(clusterIndex) },
    { key: FINAL_REVIEW_INDEX_PATH, contents: JSON.stringify(clusterIndex) },
    ...clusters.filter(cluster => cluster !== null).map((cluster): S3UploadTask => {
      return {
        key: clusterPathBuilder(cluster?.cluster.number),
        contents: JSON.stringify(cluster)
      }
    })
  ]

  
  // TODO: upload to S3  
}

main()
