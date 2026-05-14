<template>
  <div>
    <Heading level="2" class="mx-2 mb-2 md:mb-3 text-gray-600 dark:text-gray-200 font-semibold text-balance">
      In progress
    </Heading>
    <p class="text-sm pl-2 pb-3">Total number of final reviews in progress:
      <b v-if="data">{{ data.pendingFinalApproval.length }}</b>
      <i v-else>loading</i>.
    </p>
    <FinalReviewIndexTable :queue-items="data?.pendingFinalApproval" :error="error" :status="status" />

    <Heading level="2" class="mt-6 mx-2 mb-2 md:mb-3 text-gray-600 dark:text-gray-200 font-semibold text-balance">
      Done ({{ queueItemsFilterDone.length }})
    </Heading>
    <FinalReviewIndexTable :queue-items="queueItemsFilterDone" :error="error" :status="status" />

    <Heading level="2" class="mt-6 mx-2 mb-2 md:mb-3 text-gray-600 dark:text-gray-200 font-semibold text-balance">
      For publishing ({{ queueItemsFilterPublisher.length }})
    </Heading>
    <FinalReviewIndexTable :queue-items="queueItemsFilterPublisher" :error="error" :status="status" />

    <p v-if="generatedAt" class="mt-12 text-sm italic text-gray-600 dark:text-gray-400">
      Last updated
      <TimeStamp :dateTime="generatedAt" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import { getFinalReviewIndex } from '~/utils/api'
import { type QueueCommonItem } from '~/utils/validators'

const origin = usePublicSiteUrlOrigin()

const {
  data,
  status,
  error,
} = await useAsyncData(
  'final-review-index',
  () => getFinalReviewIndex(origin),
  {
    server: false,
    lazy: true
  }
)

const generatedAt = computed(() => data.value?.timestampIso ? DateTime.fromISO(data.value.timestampIso) : undefined)

const ASSIGNMENT_SET_ROLE_PUBLISHER = 'publisher'

const queueItemsFilterPublisher = computed((): QueueCommonItem[] => {
  return data.value?.notPendingFinalApproval?.filter(
    queueItem => queueItem.assignmentsByRoles?.some(
      assignmentSetItem => assignmentSetItem.role === ASSIGNMENT_SET_ROLE_PUBLISHER
    )
  ) ?? []
})

const queueItemsFilterDone = computed((): QueueCommonItem[] => {
  return data.value?.notPendingFinalApproval.filter(
    queueItem => queueItemsFilterPublisher.value.every(queueItemPublisher => queueItemPublisher.name !== queueItem.name)
  ) ?? []
})
</script>
