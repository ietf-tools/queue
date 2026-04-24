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

// const AssignmentStateSchema = z.union([
//   z.literal('assigned'),
//   z.literal('in_progress'),
//   z.literal('done'),
//   z.literal('withdrawn'),
//   z.literal('closed_for_hold')
// ])

const BlockingReasonSchema = z.object({
  reason: z.object({
    name: z.string()
  })
})

export type BlockingReason = z.infer<typeof BlockingReasonSchema>

// const AssignmentSchema = z.object({
//   state: AssignmentStateSchema
// })

const AssignmentsByRoleSchema = z.object({
  role: z.string(),
  blockingReasons: BlockingReasonSchema.array().optional()
  // assignments: AssignmentSchema.array(),
})

const LabelCommonSchema = z.object({
  slug: z.string(),
  themeColor: ThemeColorCommonSchema,
  isException: z.boolean(),
  isComplexity: z.boolean()
})

export type LabelCommon = z.infer<typeof LabelCommonSchema>

const IanaStatusCommonSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string()
})

const ApprovalLogMessageCommonSchema = z.object({
  rfcToBe: z
    .object({
      name: z.string(),
      rfcNumber: z.number().optional()
    })
    .optional(),
  logMessage: z.string(),
  timeIso: z.string().optional()
})

export type ApprovalLogMessageCommon = z.infer<typeof ApprovalLogMessageCommonSchema>

const AuthorCommonSchema = z.object({
  titlepageName: z.string(),
  isEditor: z.boolean()
})

const FinalApprovalSchema = z.object({
  approverName: z.string(),
  approvedAtIso: z.string().optional()
})

const ClusterDocumentRelationshipCommonSchema = z.union([
  z.literal('refqueue'),
  z.literal('not-received'),
  z.literal('not-received-2g'),
  z.literal('not-received-3g'),
  z.literal('withdrawnref')
])

const DocumentReferenceCommonSchema = z.object({
  relationship: ClusterDocumentRelationshipCommonSchema,
  draftName: z.string(),
  sourceRfcNumber: z.number().optional(),
  targetDraftName: z.string(),
  targetRfcNumber: z.number().optional(),
  targetDisposition: DispositionCommonSchema.optional()
})

const FinalApprovalCommonSchema = z.object({
  approved: z.number(),
  total: z.number()
})

export const QueueCommonItemSchema = z.object({
  name: z.string(),
  title: z.string(),
  rev: z.string(),
  stream: z.string().optional(),
  consensus: z.boolean(),
  finalApprovals: FinalApprovalSchema.array().optional(),
  authors: AuthorCommonSchema.array(),
  disposition: DispositionCommonSchema,
  deadlineIso: z.string().optional(), // ISO date
  labels: LabelCommonSchema.array().optional(),
  clusters: z.number().array().optional(),
  assignmentsByRoles: AssignmentsByRoleSchema.array().optional(),
  pages: z.number().optional(),
  enqueuedAtIso: z.string().optional(), // ISO date
  ianaStatus: IanaStatusCommonSchema.optional(),
  approvalLogMessages: ApprovalLogMessageCommonSchema.array().optional(),
  group: z.string().optional(),
  groupName: z.string().optional(),
  stdLevel: z.string().optional(),
  references: DocumentReferenceCommonSchema.array().optional(),
  finalApprovalCounts: FinalApprovalCommonSchema.optional(),
})

export type QueueCommonItem = z.infer<typeof QueueCommonItemSchema>

export const QueueCommonSchema = z.object({
  generatedAtIso: z.string(),
  items: z.array(QueueCommonItemSchema)
})

export type QueueCommon = z.infer<typeof QueueCommonSchema>

export type DocumentReferenceCommon = z.infer<typeof DocumentReferenceCommonSchema>

export const ClusterDocumentCommonSchema = z.object({
  name: z.string(),
  rfcNumber: z.number().optional(),
  disposition: DispositionCommonSchema.optional(),
  references: DocumentReferenceCommonSchema.array(),
  isReceived: z.boolean(),
  isBlocked: z.boolean().optional(),
  isNormRef: z.boolean().optional(),
  finalApprovalCounts: FinalApprovalCommonSchema.optional()
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
  disposition: DispositionCommonSchema
})

export type ClusterRfcToBeCommon = z.infer<typeof ClusterRfcToBeCommonSchema>

export const ClusterPackageCommonSchema = z.object({
  generatedAtIso: z.string(),
  cluster: ClusterItemCommonSchema
})

export type ClusterPackageCommon = z.infer<typeof ClusterPackageCommonSchema>

export const ClusterIndexCommonSchema = z.object({
  generatedAtIso: z.string(),
  list: ClusterItemCommonSchema.array()
})

export type ClusterIndexCommon = z.infer<typeof ClusterIndexCommonSchema>
