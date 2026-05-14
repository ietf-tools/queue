<template>
  <FinalReviewDraft v-if="queueItem && draftQueue" :id="`rfc${props.rfcNumber}`" heading-level="1"
    :draft-name="queueItem.name" :queue="draftQueue" />
  <RpcHr class="mt-12" />
  <p v-if="queueIndex?.timestampIso" class="mt-8 text-sm italic text-gray-600 dark:text-gray-400">
    Last updated
    <TimeStamp :dateTimeIso="queueIndex.timestampIso" />
  </p>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

type Props = {
  rfcNumber: number
}

const props = defineProps<Props>()

const origin = usePublicSiteUrlOrigin()

const {
  data: queueIndex,
  status: queueIndexStatus,
  error: queueIndexError,
} = await useAsyncData(
  'queue-index',
  () => getQueueIndex(origin),
  {
    server: true,
    lazy: false,
  }
)

if (!queueIndex.value || queueIndexStatus.value === 'error') {
  console.error(`[500] RFC ${props.rfcNumber}`, queueIndexError.value)
  throw createError({
    statusCode: 500,
    statusMessage: `Internal error ${queueIndexError.value}`,
    fatal: true
  })
}

const queueItem = computed(() => {
  return queueIndex.value?.items.find(item => item.rfcNumber === props.rfcNumber)
})

const draftQueue = computed((): QueueCommon | undefined => {
  if (queueItem.value?.finalApprovals?.length) {
    return queueIndex.value ?? undefined
  }
  return undefined
})

if (!draftQueue.value) {
  console.error(`[404] RFC ${props.rfcNumber}`, queueIndexStatus.value, queueIndexError.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}

const route = useRoute()

const canonicalPath = computed(() => rfcFinalReviewPathBuilder(props.rfcNumber))

if (
  // only compare route.path not route.fullPath as that will clobber ?search#id params
  route.path !== canonicalPath.value
) {
  await navigateTo({
    path: canonicalPath.value
  })
}

const modifiedDateTime = computed(() => {
  const { value: item } = queueItem
  if (!item) {
    return undefined
  }
  const timestampMillis = ([
    ...(item.approvalLogMessages || []).map(
      message =>
        message.timeIso ?
          DateTime.fromISO(message.timeIso).toMillis()
          : undefined
    ),
    ...(item.actionholderSet || []).map(
      actionholder =>
        actionholder.deadlineIso ?
          DateTime.fromISO(actionholder.deadlineIso).toMillis()
          : undefined
    )
  ]).filter(
    maybeTimestampMillis => typeof maybeTimestampMillis === 'number'
  )
  if (timestampMillis.length === 0) {
    return undefined
  }

  const maxTimestampMilli = Math.max(...timestampMillis)
  console.log('modifiedDateTime max', DateTime.fromMillis(maxTimestampMilli).toLocaleString(), timestampMillis.map(millis => DateTime.fromMillis(millis).toLocaleString()),)
  if (!maxTimestampMilli) {
    return undefined
  }
  return DateTime.fromMillis(maxTimestampMilli)
})

useQueueRfcEditorHead({
  title: `RFC-to-be ${props.rfcNumber} final review`,
  canonicalPath: canonicalPath.value,
  contentType: 'article',
  modifiedDateTime: modifiedDateTime.value
})

</script>