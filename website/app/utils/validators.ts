import { z } from 'zod'

export const QueueItemSchema = z.object({
    type: z.literal("queueItem")
})