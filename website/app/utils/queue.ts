import { DateTime } from 'luxon'
import { finalReviewPathBuilder } from './url'
import { type QueueCommonItem } from './validators'
import { Anchor, BaseBadge, TimeStamp } from '#components'

export const calculateEnqueuedAtData = (enqueuedAtJSDate: Date) => {
  const enqueuedAt = DateTime.fromJSDate(enqueuedAtJSDate)
  const now = DateTime.now()
  const diffInDays = now.diff(enqueuedAt, 'days').days
  const weeksInQueue = Math.floor((diffInDays / 7) * 2) / 2 // Floor to nearest 0.5
  return { enqueuedAt, diffInDays, weeksInQueue }
}

export const renderEnqueuedAt = ({
  enqueuedAt,
  weeksInQueue
}: ReturnType<typeof calculateEnqueuedAtData>) => {
  return h('div', { class: 'text-xs' }, [
    h('div', enqueuedAt.toISODate() ?? ''),
    h('div', `(${weeksInQueue} week${weeksInQueue !== 1 ? 's' : ''})`)
  ])
}

type AssignmentByRole = NonNullable<QueueCommonItem['assignmentsByRoles']>[number]

type BlockingReason = NonNullable<AssignmentByRole['blockingReasons']>[number]

type RenderAssignmentsAsRolesProps = {
  assignmentsByRoles: QueueCommonItem['assignmentsByRoles']
  hideLinkDetails: boolean
  linkFinalReviewsBy:
  { type: 'RFC_NUMBER', rfcNumber: number } |
  { type: 'DRAFTNAME', draftName: string }
}

export const renderAssignmentsAsRoles = ({
  assignmentsByRoles,
  hideLinkDetails,
  linkFinalReviewsBy
}: RenderAssignmentsAsRolesProps) => {
  if (!assignmentsByRoles) {
    return
  }

  const assignmentsByRolesFiltered = assignmentsByRoles.filter((assignmentsByRole) => {
    // Filter per https://github.com/ietf-tools/queue/issues/13#issuecomment-4027164633
    switch (assignmentsByRole.role) {
      case 'ref_checker':
      case 'publisher':
        return false
    }
    return true
  })

  // See https://github.com/ietf-tools/queue/issues/13#issue-4018981455
  const editorRoles = ['first_editor', 'second_editor', 'final_review_editor']
  const isAwaitingEditorAssignment =
    assignmentsByRolesFiltered.every((assignmentByRole) => assignmentByRole.role !== 'blocked') &&
    !assignmentsByRolesFiltered.some((assignmentByRole) =>
      editorRoles.includes(assignmentByRole.role)
    )

  const humanFriendlyRole = (assignmentByRole: AssignmentByRole): string => {
    switch (assignmentByRole.role) {
      case 'first_editor':
        return 'In Progress (First Edit)'
      case 'second_editor':
        return 'In Progress (Second Edit)'
      case 'final_review_editor':
        return 'In Final Review'
      case 'Reference: First Edit Incomplete':
        break
    }
    return assignmentByRole.role.replace(/_/g, ' ')
  }

  const humanFriendlyBlockingReason = (blockingReason: BlockingReason): string => {
    switch (blockingReason.reason.name) {
      case 'Reference: First Edit Incomplete':
        return 'Author Input Required'
    }
    return blockingReason.reason.name.replace(/_/g, ' ')
  }

  return h('ul', { class: 'inline-flex flex-wrap items-center gap-1' }, [
    isAwaitingEditorAssignment
      ? h(
        'li',
        { class: 'inline-flex flex-wrap items-center gap-1' },
        h(BaseBadge, { color: 'emerald' }, () => 'Awaiting Editor Assignment')
      )
      : undefined,
    ...assignmentsByRolesFiltered.map((assignmentByRole) => {
      const badge = h(BaseBadge, { class: '' }, () => humanFriendlyRole(assignmentByRole))

      return h('li', { class: 'inline-flex flex-wrap items-center gap-1' }, [
        hideLinkDetails !== true && assignmentByRole.role === 'final_review_editor'
          ? h(Anchor, {
            href: linkFinalReviewsBy.type === 'RFC_NUMBER'
              ? rfcFinalReviewPathBuilder(linkFinalReviewsBy.rfcNumber)
              : finalReviewPathBuilder(linkFinalReviewsBy.draftName)
          }, () => [
            badge,
            h('span', { class: 'underline text-xs ml-1' }, 'more details')
          ])
          : badge,
        assignmentByRole.blockingReasons
          ? h(
            'span',
            { class: 'text-xs text-gray-500 dark:text-neutral-400' },
            assignmentByRole.blockingReasons.map((blockingReason) =>
              humanFriendlyBlockingReason(blockingReason)
            )
          )
          : null
      ])
    })
  ])
}

export const sortIsoDateStrings = (aIsoDate: string | undefined, bIsoDate: string | undefined): number => {
  if (aIsoDate === undefined && bIsoDate === undefined) {
    return 0
  }
  if (aIsoDate !== undefined && bIsoDate === undefined) {
    return -1
  }
  if (aIsoDate === undefined && bIsoDate !== undefined) {
    return 1
  }
  // this function only exists to narrow types for TS benefit
  if (aIsoDate === undefined || bIsoDate === undefined) {
    throw Error('internal error: Expected undefined dates to be filtered by now')
  }
  const aDateTime = DateTime.fromISO(aIsoDate)
  const bDateTime = DateTime.fromISO(bIsoDate)
  return aDateTime.toMillis() - bDateTime.toMillis()
}

export const renderIsoDateComponent = (isoDate?: string) => {
  if (!isoDate) {
    return
  }
  const dateTime = DateTime.fromISO(isoDate)
  const shortDate = dateTime.toLocaleString(DateTime.DATE_SHORT)
  return h('time', { datetime: isoDate }, shortDate)
}

export const renderIsoDateAsTooltipComponent = (isoDate?: string) => {
  if (!isoDate) {
    return
  }
  return h(TimeStamp, { dateTimeIso: isoDate, mode: 'SHORT_DATE' })
}