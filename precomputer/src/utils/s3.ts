import { S3Client, PutObjectCommand, paginateListObjectsV2, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { assertIsString } from './typescript.ts'

let s3Ref: undefined | { s3Client: S3Client, bucket: string } = undefined

const getS3Singleton = () => {
  if (!s3Ref) {
    const S3_QUEUE_ENDPOINT = process.env.R2_QUEUE_ENDPOINT
    const S3_QUEUE_ACCESS_ID = process.env.R2_QUEUE_ACCESS_ID
    const S3_QUEUE_ACCESS_KEY = process.env.R2_QUEUE_SECRET_KEY
    assertIsString(S3_QUEUE_ENDPOINT, `process.env.R2_QUEUE_ENDPOINT wasn't a string. Was ${typeof S3_QUEUE_ENDPOINT}`)
    assertIsString(S3_QUEUE_ACCESS_ID, `process.env.R2_QUEUE_ACCESS_ID wasn't a string. Was ${typeof S3_QUEUE_ACCESS_ID}`)
    assertIsString(S3_QUEUE_ACCESS_KEY, `process.env.R2_QUEUE_SECRET_KEY wasn't a string. Was ${typeof S3_QUEUE_ACCESS_KEY}`)

    const s3Client = new S3Client({
      endpoint: S3_QUEUE_ENDPOINT,
      region: 'auto',
      credentials: {
        accessKeyId: S3_QUEUE_ACCESS_ID,
        secretAccessKey: S3_QUEUE_ACCESS_KEY
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED'
    })

    const S3_BUCKET = process.env.R2_QUEUE_BUCKET
    assertIsString(
      S3_BUCKET,
      `process.env.R2_QUEUE_BUCKET wasn't a string. Was ${typeof S3_BUCKET}`
    )

    s3Ref = { s3Client, bucket: S3_BUCKET }
  }

  return s3Ref
}

const sniffS3ContentType = (key: string) => {
  if (key.endsWith('.json')) {
    return "application/json"
  }
  return undefined
}

type StreamingBlobPayloadInputTypes = ConstructorParameters<
  typeof PutObjectCommand
>[0]['Body']

export const saveToS3 = async (
  key: string,
  contents: StreamingBlobPayloadInputTypes
): Promise<void> => {
  const { s3Client, bucket } = getS3Singleton()

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: contents,
      ContentType: sniffS3ContentType(key)
    })
  )
}

export const deleteFromS3 = async (
  key: string,
): Promise<void> => {
  const { s3Client, bucket } = getS3Singleton()

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key
    })
  )
}

export const listS3Files = async () => {
  const { s3Client, bucket } = getS3Singleton()
  const keys = [];
  for await (const data of paginateListObjectsV2({ client: s3Client }, { Bucket: bucket })) {
    keys.push(...(data.Contents ?? []));
  }
  return keys;
}

export type S3UploadTask = { key: string, contents: string | Buffer<ArrayBufferLike> }

export const QUEUE_INDEX_PATH = 'queue/index.json'

export const QUEUE_INDEX_XML_PATH = 'queue/index.xml'

export const QUEUE_XSD_PATH = 'queue/queue.xsd'

export const CLUSTER_INDEX_PATH = 'clusters/index.json'

export const FINAL_REVIEW_INDEX_PATH = 'final-review/index.json'

export const clusterPathBuilder = (clusterNumber: number) => `clusters/${clusterNumber}.json`

export const ROBOTS_TXT_PATH = 'other/robots.txt'

export const faviconPathBuilder = (widthPx: number, heightPx: number) => `other/favicon-${widthPx}x${heightPx}.png` as const

export const siteMapXmlFilenameBuilder = (index: number) => {
  if (index === 0) {
    return `sitemap.xml` as const
  }
  return `sitemap-${index}.xml` as const
}

export const siteMapXmlPathPrefixBuilder = (sitemapFilename: string) => {
  return `/sitemap/${sitemapFilename}` as const
}
