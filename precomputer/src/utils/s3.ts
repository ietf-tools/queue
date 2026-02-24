import { S3Client, PutObjectCommand, paginateListObjectsV2 } from '@aws-sdk/client-s3'
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

type StreamingBlobPayloadInputTypes = ConstructorParameters<
  typeof PutObjectCommand
>[0]['Body']

export async function saveToS3(
  key: string,
  contents: StreamingBlobPayloadInputTypes
): Promise<void> {
  const { s3Client, bucket } = getS3Singleton()

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: contents
    })
  )
}

export const listS3Files = async () => {
  const { s3Client, bucket } = getS3Singleton()
  const totalFiles = [];
  for await (const data of paginateListObjectsV2({ client: s3Client }, { Bucket: bucket })) {
    totalFiles.push(...(data.Contents ?? []));
  }
  return totalFiles;
};

export const QUEUE_INDEX_PATH = 'queue/index.json'

export const CLUSTER_INDEX_PATH = 'cluster/index.json'

export const FINAL_REVIEW_INDEX_PATH = 'final-review/index.json'

export const clusterPathBuilder = (clusterNumber: number) => `clusters/${clusterNumber}.json`