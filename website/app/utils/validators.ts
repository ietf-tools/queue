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

export type ThemeColorCommon = z.infer<typeof ThemeColorCommonSchema>

const DispositionCommonSchema = z.union([
  z.literal('created'),
  z.literal('in_progress'),
  z.literal('published'),
  z.literal('withdrawn')
])

const LabelCommonSchema = z.object({
  slug: z.string(),
  themeColor: ThemeColorCommonSchema,
  isException: z.boolean(),
  isComplexity: z.boolean()
})

export type LabelCommon = z.infer<typeof LabelCommonSchema>

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
  // rfcNumber: z.number().optional(),
  pages: z.number().optional(),
  enqueuedAtIso: z.string().optional(), // ISO date
  ianaStatus: IanaStatusCommonSchema.optional(),
})

export type QueueCommonItem = z.infer<typeof QueueCommonItemSchema>

export const QueueCommonSchema = z.object({
  items: z.array(QueueCommonItemSchema)
})

export type QueueCommon = z.infer<typeof QueueCommonSchema>


const ClusterDocumentRelationshipCommonSchema = z.union([
  z.literal('refqueue'),
  z.literal('not-received'),
  z.literal('not-received-2g'),
  z.literal('not-received-3g'),
])

const ClusterDocumentReferenceCommonSchema = z.object({
    relationship: ClusterDocumentRelationshipCommonSchema,
    draftName: z.string(),
    sourceRfcNumber: z.number().optional(),
    targetDraftName: z.string(),
    targetRfcNumber: z.number().optional(),
    targetDisposition: DispositionCommonSchema.optional(),
})

export type ClusterDocumentReferenceCommon = z.infer<typeof ClusterDocumentReferenceCommonSchema>

export const ClusterDocumentCommonSchema = z.object({
  name: z.string(),
  rfcNumber: z.number().optional(),
  disposition: DispositionCommonSchema.optional(),
  references: ClusterDocumentReferenceCommonSchema.array(),
  isReceived: z.boolean()
})

export type ClusterDocumentCommon = z.infer<typeof ClusterDocumentCommonSchema>

const ClusterItemCommonSchema = z.object({
  number: z.number(),
  allPublished: z.boolean(),
  documents: ClusterDocumentCommonSchema.array()
})

export type ClusterItemCommon = z.infer<typeof ClusterItemCommonSchema>

const ClusterRfcToBeCommonSchema = z.object({
  name: z.string(),
  rfcNumber: z.number().optional(),
  disposition: DispositionCommonSchema,  
})

export type ClusterRfcToBeCommon = z.infer<typeof ClusterRfcToBeCommonSchema>

export const ClusterPackageCommonSchema = z.object({
  cluster: ClusterItemCommonSchema
})

export type ClusterPackageCommon = z.infer<typeof ClusterPackageCommonSchema>

export const ClusterIndexCommonSchema = z.object({
  list: ClusterItemCommonSchema.array()
})

export type ClusterIndexCommon = z.infer<typeof ClusterIndexCommonSchema>

