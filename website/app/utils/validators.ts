import { z } from 'zod'

export const ThemeColorCommonSchema = z.union([
  z.literal('slate'),
  z.literal('gray'),
  z.literal('zinc'),
  z.literal('neutral'),
  z.literal('stone'),
  z.literal('red'),
  z.literal('orange'),
  z.literal('amber'),
  z.literal('yellow'),
  z.literal('lime'),
  z.literal('green'),
  z.literal('emerald'),
  z.literal('teal'),
  z.literal('cyan'),
  z.literal('sky'),
  z.literal('blue'),
  z.literal('indigo'),
  z.literal('violet'),
  z.literal('purple'),
  z.literal('fuchsia'),
  z.literal('pink'),
  z.literal('rose')
])

const DispositionCommonSchema = z.union([
  z.literal('created'),
  z.literal('in_progress')
])

const LabelCommonSchema = z.object({
  slug: z.string(),
  themeColor: ThemeColorCommonSchema,
})

const IanaStatusSlugCommonSchema = z.union([z.literal('reconciled'), z.literal('reconciled')])

const IanaStatusCommonSchema = z.object({
  slug: IanaStatusSlugCommonSchema,
  name: z.string(),
  description: z.string()
})

export const QueueCommonItemSchema = z.object({
  name: z.string(),
  title: z.string().optional(),
  disposition: DispositionCommonSchema,
  deadlineIso: z.string().optional(), // ISO date
  labels: LabelCommonSchema.array().optional(),
  clusters: z.number().array().optional(),
  rfcNumber: z.number().optional(),
  pages: z.number().optional(),
  enqueuedAtIso: z.string().optional(), // ISO date
  ianaStatus: IanaStatusCommonSchema.optional(),
})

export type QueueCommonItem = z.infer<typeof QueueCommonItemSchema>

export const QueueCommonSchema = z.object({
  items: z.array(QueueCommonItemSchema)
})

export type QueueCommon = z.infer<typeof QueueCommonSchema>