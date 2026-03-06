<template>
  <div class="container mx-auto my-6">
    <template v-if="finalReview">
      <Heading level="1"><span class="font-mono">{{ props.draftName }}</span> final review</Heading>

      <p class="flex-inline gap-2">
        <BaseBadge v-if="finalReview.disposition">{{ finalReview.disposition }}</BaseBadge>
        <Label v-if="finalReview.labels" v-for="label in finalReview.labels" :label="label" />

        debug: we have this data {{ finalReview }}
      </p>

      <Heading level="2">Approval Logs</Heading>
      <ol v-if="finalReview.renderableApprovalLogMessages && finalReview.renderableApprovalLogMessages.length > 0"
        class="flex flex-col gap-2">
        <li v-for="approvalLog in finalReview.renderableApprovalLogMessages">
          {{ approvalLog.logMessage }}
          <TimeStamp :dateTime="approvalLog.time">
            {{ approvalLog.timeAgo }}
          </TimeStamp>
        </li>
      </ol>
      <p v-else class="italic">No logs available</p>


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

const canonicalPath = `/final-review/${props.draftName}/`

const emptyArray: QueueCommonItem[] = []

const {
  data,
  status,
  error,
} = await useAsyncData(
  'final-review-index',
  getFinalReviewIndex,
  {
    server: false,
    lazy: true,
    default: () => emptyArray
  }
)

const finalReview = computed(() => {
  if (!data.value) return undefined
  const item = data.value.find(queueCommonItem => queueCommonItem.name === props.draftName)
  return {
    ...item,
    renderableApprovalLogMessages: item?.approvalLogMessages?.map(approvalLogMessage => {
      const time = approvalLogMessage.timeIso ? DateTime.fromISO(approvalLogMessage.timeIso) : undefined
      const timeAgo = time ? time.toRelativeCalendar() : undefined

      return {
        ...approvalLogMessage,
        time,
        timeAgo,
      }
    }) ?? undefined
  }
})

if (!finalReview || status.value === 'success' && data.value === null) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
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
  title: `Final Review ${props.draftName}`
})

</script>