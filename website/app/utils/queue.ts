import { DateTime } from 'luxon'

export const calculateEnqueuedAtData = (enqueuedAtJSDate: Date) => {
  const enqueuedAt = DateTime.fromJSDate(enqueuedAtJSDate)
  const now = DateTime.now()
  const diffInDays = now.diff(enqueuedAt, 'days').days
  const weeksInQueue = Math.floor(diffInDays / 7 * 2) / 2 // Floor to nearest 0.5
  return { enqueuedAt, diffInDays, weeksInQueue }
}

export const renderEnqueuedAt = ({ enqueuedAt, weeksInQueue }: ReturnType<typeof calculateEnqueuedAtData>) => {
  return h('div',
    { class: 'text-xs' },
    [
      h('div', enqueuedAt.toISODate() ?? ''),
      h('div', `(${weeksInQueue} week${weeksInQueue !== 1 ? 's' : ''})`)
    ])
}
