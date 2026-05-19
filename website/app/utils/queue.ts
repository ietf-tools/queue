import { DateTime } from 'luxon'
import { finalReviewPathBuilder } from './url'
import { type LabelCommon, type QueueCommonItem, type ThemeColorCommon } from './validators'
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

type RenderAssignmentsByRolesProps = {
  assignmentsByRoles: QueueCommonItem['assignmentsByRoles']
  pendingActivities: QueueCommonItem['pendingActivities'],
  ianaStatus: QueueCommonItem['ianaStatus'],
  hideLinkDetails: boolean
  linkFinalReviewsBy:
  { type: 'RFC_NUMBER', rfcNumber: number } |
  { type: 'DRAFTNAME', draftName: string }
}

export const renderAssignmentsByRoles = ({
  assignmentsByRoles,
  pendingActivities,
  ianaStatus,
  hideLinkDetails,
  linkFinalReviewsBy
}: RenderAssignmentsByRolesProps) => {
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
  const editorRoles: AssignmentByRole['role'][] = ['first_editor', 'second_editor', 'final_review_editor']

  const isBlocked =
    assignmentsByRolesFiltered.some((assignmentByRole) => assignmentByRole.role === 'blocked')

  // https://github.com/ietf-tools/queue/issues/29#issuecomment-4144104259
  const isIANAHold = Boolean(ianaStatus?.slug === 'not_completed') && assignmentsByRoles.some(assignmentsByRole =>
    assignmentsByRole.role === 'first_editor'
  )

  const humanFriendlyRole = (assignmentByRole: AssignmentByRole): string => {
    switch (assignmentByRole.role) {
      case 'first_editor':
        return 'In Progress (First Edit)'
      case 'second_editor':
        return 'In Progress (Second Edit)'
      case 'final_review_editor':
        return 'In Final Review'
    }
    return assignmentByRole.role.replace(/_/g, ' ')
  }

  const slugToHumanReadable = (slug: string): string => {
    return slug.replace(/_/g, ' ')
  }

  const humanFriendlyBlockingReason = (blockingReason: BlockingReason): string => {
    switch (blockingReason.reason.name) {
      case 'Reference: First Edit Incomplete':
        return 'Author Input Required'
    }
    return slugToHumanReadable(blockingReason.reason.name)
  }

  return h('ul', { class: 'inline-flex flex-wrap items-center gap-1' }, [
    isIANAHold ? 'IANA hold' : undefined,
    !isBlocked && pendingActivities
      ? pendingActivities
        .filter(pendingActivity => {
          // If both CURRENT and PENDING assignments are present, the queue should just show the CURRENT assignment.
          const isAlsoCurrent = assignmentsByRoles.some(assignmentsByRole => assignmentsByRole.role === pendingActivity.slug)

          return !isAlsoCurrent
        })
        .map(pendingActivity => {
          return h(
            'li',
            { class: 'inline-flex flex-wrap items-center gap-1' },
            h(
              BaseBadge,
              {
                color:
                  editorRoles.includes(pendingActivity.slug) ? 'emerald' : 'green'
              },
              () => {
                if ((pendingActivity.name)) {
                  return `Awaiting ${pendingActivity.name}`
                }
                return `Awaiting ${slugToHumanReadable(pendingActivity.slug)}`
              }
            )
          )
        })
      : undefined,
    ...assignmentsByRolesFiltered.map((assignmentByRole) => {
      const badge = h(
        BaseBadge,
        { color: getRoleColor(assignmentByRole.role) },
        () => humanFriendlyRole(assignmentByRole)
      )

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

export const getRoleColor = (role: AssignmentByRole['role']): ThemeColorCommon => {
  switch (role) {
    case 'blocked':
      return 'red'
    case 'first_editor':
    case 'second_editor':
    case 'final_review_editor':
      return 'green'
    case 'formatting':
      return 'blue'
    case 'second_editor_editor':
    case 'publisher':
    case 'ref_checker':
      return 'gray'
  }
  assertNever(role)
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
  // this only exists to narrow types for TS benefit
  if (aIsoDate === undefined || bIsoDate === undefined) {
    throw Error('internal error: Expected undefined dates to be filtered by now')
  }
  const aDateTime = DateTime.fromISO(aIsoDate)
  const bDateTime = DateTime.fromISO(bIsoDate)
  return aDateTime.toMillis() - bDateTime.toMillis()
}

export const sortLabels = (aLabels: LabelCommon[] | undefined, bLabels: LabelCommon[] | undefined): number => {
  if (aLabels === undefined && bLabels === undefined) {
    return 0
  }
  if (aLabels !== undefined && bLabels === undefined) {
    return -1
  }
  if (aLabels === undefined && bLabels !== undefined) {
    return 1
  }
  // this only exists to narrow types for TS benefit
  if (aLabels === undefined || bLabels === undefined) {
    throw Error('internal error: Expected undefined dates to be filtered by now')
  }

  /**
   * Custom `Label` stringify for use in String.localeCompare(), which:
   *  * presumably sorts better on strings of human language not JSON.stringify()-syntax-tech-babble
   *  * by manually stringifying Label we avoid JSON.stringify() key order instability affecting comparisons.
   *    ES2015/ES6 stabilises this slightly but still has 'insertion order' affecting 'key order' criteria,
   *    which seems a bad thing to rely on in a sort function.
   * So that's why it's a custom stringify
   */
  const labelToLocaleComparable = (label: LabelCommon) => `${label.slug} (${label.isComplexity}) [${label.isException}]`

  const aLabelsComparable = aLabels.map(labelToLocaleComparable).join('. ')
  const bLabelsComparable = bLabels.map(labelToLocaleComparable).join('. ')
  return aLabelsComparable.localeCompare(bLabelsComparable)
}

export const sortClusters = (aClusters: QueueCommonItem['clusters'], bClusters: QueueCommonItem['clusters']): number => {
  if (aClusters === undefined && bClusters === undefined) {
    return 0
  }
  if (aClusters !== undefined && bClusters === undefined) {
    return -1
  }
  if (aClusters === undefined && bClusters !== undefined) {
    return 1
  }
  const clustersToLocaleComparable = (clusters: QueueCommonItem['clusters']) => (clusters ?? []).join(', ')
  return clustersToLocaleComparable(aClusters).localeCompare(clustersToLocaleComparable(bClusters))
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