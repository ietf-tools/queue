import { PromisePool } from '@supercharge/promise-pool'
import { getClusterIndex } from './tasks/cluster-index.ts'
import { getClusterPackage } from './tasks/cluster.ts'
import { getFinalReviewIndex } from './tasks/final-review-index.ts'
import { getQueueIndex } from './tasks/queue-index.ts'
import { getApiClient } from './utils/api.ts'
import {
  CLUSTER_INDEX_PATH,
  FINAL_REVIEW_INDEX_PATH,
  QUEUE_INDEX_PATH,
  QUEUE_INDEX_XML_PATH,
  QUEUE_XSD_PATH,
  ROBOTS_TXT_PATH,
  type S3UploadTask,
  clusterPathBuilder,
  deleteFromS3,
  listS3Files,
  saveToS3
} from './utils/s3.ts'
import { type ClusterPackageCommon } from '../../website/app/utils/validators.ts'
import { difference } from 'es-toolkit'
import { assertIsString } from './utils/typescript.ts'
import { getQueueXML } from './tasks/queue-xml.ts'
import { getQueueXSD } from './tasks/queue-xsd.ts'
import { getSiteMapXmls } from './tasks/sitemap-xml.ts'
import { getRobotsTxt } from './tasks/robots-txt.ts'
import { getFavicons } from './tasks/favicon.ts'

// This is just a hint number, not a hard limit at all
const NUMBER_OF_CONCURRENT_API_USAGES = 4

// This is just a hint number, not a hard limit at all
const NUMBER_OF_CONCURRENT_S3_USAGES = 4

const main = async (): Promise<void> => {
  const websiteOrigin = process.env.NUXT_PUBLIC_SITE_BASE

  assertIsString(websiteOrigin, 'Expected process.env.NUXT_PUBLIC_SITE_BASE to be string')

  const api = getApiClient()
  const [queueIndex, clusterIndex, finalReviewIndex, queueXML, queueXSD, faviconUploadTasks] = await Promise.all([
    getQueueIndex({ api }),
    getClusterIndex({ api }),
    getFinalReviewIndex({ api }),
    getQueueXML({ api }),
    getQueueXSD(),
    getFavicons()
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
    // `null` is a valid response if a cluster is !isActive so we don't want to upload that
    maybeClusterPackage => maybeClusterPackage !== null
  )

  const robotsTxt = getRobotsTxt(websiteOrigin)

  console.log(`[Clusters] Successfully fetched ALL cluster API data for ${clusterPackages.length} cluster(s).`)

  const siteMapUploadTasks: S3UploadTask[] = await getSiteMapXmls({ websiteOrigin, clusterIndex, finalReviewIndex })

  const uploadTasks: S3UploadTask[] = [
    { key: QUEUE_INDEX_PATH, contents: JSON.stringify(queueIndex) },
    { key: CLUSTER_INDEX_PATH, contents: JSON.stringify(clusterIndex) },
    { key: FINAL_REVIEW_INDEX_PATH, contents: JSON.stringify(finalReviewIndex) },
    { key: QUEUE_INDEX_XML_PATH, contents: queueXML },
    { key: QUEUE_XSD_PATH, contents: queueXSD },
    { key: ROBOTS_TXT_PATH, contents: robotsTxt },
    ...siteMapUploadTasks,
    ...faviconUploadTasks,
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
