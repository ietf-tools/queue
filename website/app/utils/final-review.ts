import type { DateTime } from "luxon"
import type { h } from 'vue'

export const makeDomId = (name: string): string => `${name}`

export type ApprovalLogMessages = NonNullable<QueueCommonItem['approvalLogMessages']>
export type RenderableApprovalLogMessage = (ApprovalLogMessages[number] & {
  logMessageComponent: ReturnType<typeof h>
  time?: DateTime
  timeAgo?: string | null
})

export type FinalReviewDraft = QueueCommonItem & {
  generatedAt?: DateTime
  renderableApprovalLogMessages?: RenderableApprovalLogMessage[]
}