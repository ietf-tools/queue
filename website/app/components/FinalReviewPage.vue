<template>
  <div class="container mx-auto my-6">
    <template v-if="finalReview">
      <Heading level="1"><span class="font-mono">{{ props.draftName }}</span> final review</Heading>

      <p class="flex-inline gap-2 mt-2">
        <BaseBadge v-if="finalReview.disposition">{{ finalReview.disposition.replace(/_/g, ' ') }}</BaseBadge>
        <Label v-if="finalReview.labels" v-for="label in finalReview.labels" :label="label" />
      </p>

      <Heading level="2" class="mt-3 mb-2">Approval Logs</Heading>
      <ol v-if="finalReview.renderableApprovalLogMessages && finalReview.renderableApprovalLogMessages.length > 0"
        class="flex flex-col gap-2">
        <li v-for="approvalLog in finalReview.renderableApprovalLogMessages">
          <component :is="approvalLog.logMessageComponent" />
          <p class="text-xs italic text-gray-600 dark:text-gray-400 mt-1">Log posted
            <TimeStamp :dateTime="approvalLog.time" />
          </p>
        </li>
      </ol>
      <p v-else class="italic">No logs available</p>

      <hr class="mt-12" />
      <p v-if="finalReview.generatedAt" class="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
        Updated
        <TimeStamp :dateTime="finalReview.generatedAt" />
      </p>
    </template>
    <template v-else>
      <p>404: No final review found.</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

type Props = {
  draftName: string
}

const props = defineProps<Props>()

const url = useRequestURL()

const canonicalPath = `/final-review/${props.draftName}/`

const {
  data,
  status,
  error,
} = await useAsyncData(
  'final-review-index',
  () => getFinalReviewIndex(url.hostname),
  {
    server: true, // rendering on the server to generate real 404s for missing content
    lazy: false,
  }
)

const finalReview = computed(() => {
  if (!data.value) return null
  const item = data.value.items.find(queueCommonItem => queueCommonItem.name === props.draftName)
  if (!item) return null
  return {
    ...item,
    generatedAt: data.value.generatedAtIso ? DateTime.fromISO(data.value.generatedAtIso) : undefined,
    renderableApprovalLogMessages: item?.approvalLogMessages?.map(approvalLogMessage => {
      const time = approvalLogMessage.timeIso ? DateTime.fromISO(approvalLogMessage.timeIso) : undefined
      const timeAgo = time ? time.toRelativeCalendar() : undefined

      return {
        ...approvalLogMessage,
        logMessageComponent: h('div', { class: 'font-mono flex flex-col gap-2' },
          approvalLogMessage.logMessage.split(/\n/g).map(
            line => h('p', String(line))
          )
        ),
        time,
        timeAgo,
      }
    }) ?? undefined
  }
})

if (!finalReview.value || status.value === 'success' && !data.value || status.value === 'error') {
  console.error(`[404] ${props.draftName}`, status.value, error.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}

if (status.value === 'pending' || status.value === 'idle') {
  console.error(`[500] ${props.draftName} unexpected state`, status.value, error.value)
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal error',
    fatal: true
  })
}

const route = useRoute()

if (route.fullPath !== canonicalPath) {
  await navigateTo({
    path: canonicalPath
  })
}

useHead({
  title: `${props.draftName} final review`
})

</script>