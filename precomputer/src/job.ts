

import { getQueueCommon } from './tasks/queue.ts'
import { getApiClient } from './utils/api.ts'

const main = async (): Promise<void> => {
  const api = getApiClient()
  const queueCommon = await getQueueCommon({ api })
  // TODO: upload to S3  
}

main()
