import { PromisePool } from '@supercharge/promise-pool'
import { getClusterIndex } from './tasks/cluster-index.ts'
import { getClusterPackage } from './tasks/cluster.ts'
import { getFinalReviewIndex } from './tasks/final-review-index.ts'
import { getQueueIndex } from './tasks/queue-index.ts'
import { getApiClient } from './utils/api.ts'
import { CLUSTER_INDEX_PATH, clusterPathBuilder, deleteFromS3, FINAL_REVIEW_INDEX_PATH, listS3Files, QUEUE_INDEX_PATH, saveToS3 } from './utils/s3.ts'
import { type ClusterPackageCommon } from '../../website/app/utils/validators.ts'
import { difference } from 'es-toolkit'
import { assertIsString } from './utils/typescript.ts'

type S3UploadTask = { key: string, contents: string }

// This is absolutely just a hint number, not a hard limit at all
const NUMBER_OF_CONCURRENT_API_USAGES = 4

// This is absolutely just a hint number, not a hard limit at all
const NUMBER_OF_CONCURRENT_S3_USAGES = 4

const main = async (): Promise<void> => {
  const api = getApiClient()
  const [queueIndex, clusterIndex, finalReviewIndex] = await Promise.all([
    getQueueIndex({ api }),
    getClusterIndex({ api }),
    getFinalReviewIndex({ api })
  ])

  console.log(`[Clusters] Fetching cluster API data for ${clusterIndex.list.length} item(s) using ${NUMBER_OF_CONCURRENT_API_USAGES} concurrent processes`)

  const { results: maybeClusterPackages, errors: apiErrors } = await PromisePool.for(clusterIndex.list)
    .withConcurrency(NUMBER_OF_CONCURRENT_API_USAGES)
    .process(async (cluster): Promise<ClusterPackageCommon | null> => {
      console.log(`[Cluster ${cluster.number}] fetching API data`)
      const clusterPackage = await getClusterPackage({ api, clusterNumber: cluster.number })
      console.log(`[Cluster ${cluster.number}] succeeded fetching API data`)
      return clusterPackage
    })

  if (apiErrors.length) {
    console.error("[Clusters] Errors occured during fetching cluster API data", apiErrors)
    console.error("Cannot continue. Exiting...")
    return
  }

  const clusterPackages = maybeClusterPackages.filter(
    // `null` is a valid response if a cluster is !isActive but we don't care about uploading that
    maybeClusterPackage => maybeClusterPackage !== null
  )

  console.log(`[Clusters] Successfully fetched ALL cluster API data for ${clusterPackages.length} cluster(s).`)

  const uploadTasks: S3UploadTask[] = [
    { key: QUEUE_INDEX_PATH, contents: JSON.stringify(queueIndex) },
    { key: CLUSTER_INDEX_PATH, contents: JSON.stringify(clusterIndex) },
    { key: FINAL_REVIEW_INDEX_PATH, contents: JSON.stringify(finalReviewIndex) },
    ...clusterPackages.map((clusterPackage): S3UploadTask => {
      return {
        key: clusterPathBuilder(clusterPackage.cluster.number),
        contents: JSON.stringify(clusterPackage)
      }
    })
  ]

  console.log(`[Uploads] Uploading ${uploadTasks.length} files`)

  const { errors: uploadErrors } = await PromisePool.for(uploadTasks)
    .withConcurrency(NUMBER_OF_CONCURRENT_S3_USAGES)
    .process(async (uploadTask) => {
      try {
        await saveToS3(uploadTask.key, uploadTask.contents)
        console.log(`[Upload ${uploadTask.key}] upload succeeded`)
      } catch (err) {
        console.warn(
          `[Upload ${uploadTask.key}] threw exception: ${(err as Error).message}`
        )
        throw err
      }
    })

  if (uploadErrors.length) {
    console.error("[Uploads] Errors occured during upload tasks", uploadErrors)
    console.error("Cannot continue. Exiting...")
    return
  }

  const existingBucketObjects = await listS3Files()
  const existingBucketKeys = existingBucketObjects.map(obj => {
    assertIsString(obj.Key, `Bucket object ${JSON.stringify(obj)} has no key.`)
    return obj.Key
  })
  const validBucketKeys = uploadTasks.map(uploadTask => uploadTask.key)
  const keysToPurge = difference(existingBucketKeys, validBucketKeys)
  if (keysToPurge.length > 0) {
    console.log(`[Cleanup] File storage purge of ${keysToPurge.length} object(s)`)
    const { errors: purgeErrors } = await PromisePool.for(keysToPurge)
      .withConcurrency(NUMBER_OF_CONCURRENT_S3_USAGES)
      .process(async (keyToPurge) => {
        try {
          await deleteFromS3(keyToPurge)
          console.log(`[Cleanup ${keyToPurge}] deleted sucessfully`)
        } catch (err) {
          console.warn(
            `[Cleanup ${keyToPurge}] threw exception: ${(err as Error).message}`
          )
          throw err
        }
      })
    if (purgeErrors.length) {
      console.error("[Cleanup] There were errors purging files.", purgeErrors)
      console.error('[Cleanup] Bucket retains files that it shouldn\'t. This is bad.')
      console.error("Cannot continue. Exiting...")
    }
  } else {
    console.log("[Cleanup] No need to purge any files from S3.")
  }
  console.log("Done!")
}

main()
