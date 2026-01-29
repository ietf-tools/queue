import { QueueItemSchema } from '../../website/app/utils/validators.ts'

const main = async (): Promise<void> => {
  console.log('Test', JSON.stringify(
    QueueItemSchema.parse({type: "queueItem"})
  ))
}

main()
