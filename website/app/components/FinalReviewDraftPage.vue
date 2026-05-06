<template>
  <FinalReviewDraft v-if="draftQueue" :id="props.draftName" heading-level="1" :draft-name="props.draftName"
    :queue="draftQueue" />
  <hr class="mt-12" />
  <p v-if="queueIndex?.timestampIso" class="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
    Last updated
    <TimeStamp :dateTimeIso="queueIndex.timestampIso" />
  </p>
</template>

<script setup lang="ts">

type Props = {
  id: string
  headingLevel: HeadingLevel
  draftName: string
}

const props = defineProps<Props>()

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

const draftQueue = computed((): QueueCommon | undefined => {
  const queueItem = queueIndex.value?.items.find(item => item.name === props.draftName)
  if (queueItem?.finalApprovals?.length) {
    return queueIndex.value ?? undefined
  }
  return undefined
})

if (!queueIndex.value || queueIndexStatus.value === 'error') {
  console.error(`[500] ${props.draftName}`, queueIndexError.value)
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal error',
    fatal: true
  })
}

if (!draftQueue.value) {
  console.error(`[404] ${props.draftName}`, queueIndexStatus.value, queueIndexError.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}


const route = useRoute()

const canonicalPath = computed(() => `/final-review/${props.draftName}/`)

if (
  // only compare route.path not route.fullPath as that will clobber ?search#id params
  route.path !== canonicalPath.value
) {
  await navigateTo({
    path: canonicalPath.value
  })
}

useQueueRfcEditorHead({
  title: `${props.draftName} final review`,
  canonicalPath: canonicalPath.value,
  contentType: 'article'
})

</script>