<template>
  <div class="container mx-auto my-6">
    <ClusterFinalReviewPage v-if="mode?.cluster" :cluster="mode.cluster" :queue="clusterQueue" />
    <FinalReviewDraft v-if="mode?.draftName" heading-level="1" :id="mode.draftName" :draft-name="mode.draftName"
      :queue="finalReview" />
    <hr class="mt-12" />
    <p v-if="finalReview?.timestampIso" class="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
      Last updated
      <TimeStamp :dateTimeIso="finalReview.timestampIso" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { useQueueRfcEditorHead } from '~/utils/head';

const route = useRoute()

const id = computed(() => route.params.id?.toString())

if (!id) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}

const mode = computed(() => {
  if (!id.value) {
    return undefined
  }

  const cluster = id.value.match(/^c(\d+)$/i)

  if (!cluster || !cluster[1]) {
    return {
      draftName: id.value,
    }
  }

  return {
    cluster: parseInt(cluster[1], 10)
  }
})

const canonicalPath = computed(() => {
  if (!mode.value) return undefined
  if (mode.value.cluster) {
    return `/final-review/C${mode.value.cluster}/`
  }
  if (mode.value.draftName) {
    return `/final-review/${mode.value.draftName}/`
  }
})

if (
  id.value &&
  // only compare route.path not route.fullPath as that will clobber ?search#id params
  route.path !== canonicalPath.value
) {
  await navigateTo({
    path: canonicalPath.value
  })
}

const origin = usePublicSiteUrlOrigin()

const {
  data: finalReview,
  status: finalReviewStatus,
  error: finalReviewError,
} = await useAsyncData(
  'final-review-index',
  () => getFinalReviewIndex(origin),
  {
    server: true, // rendering on the server to generate real 404s for missing content
    lazy: false,
  }
)

const {
  data: clusterIndex,
  status: clusterIndexStatus,
  error: clusterIndexError,
} = await useAsyncData(
  'clusters-index',
  () => getClusterIndex(origin),
  {
    server: true,
    lazy: false
  }
)

if (!finalReview.value || finalReviewStatus.value === 'success' && !finalReview.value || finalReviewStatus.value === 'error') {
  console.error(`[404] ${id}`, finalReviewStatus.value, finalReviewError.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}

if (finalReview.value && mode.value) {
  if (mode.value.cluster) {
    // if this specific cluster isn't in the final reviews data then 404
    if (!finalReview.value.items.some(item => item.clusters?.some(cluster => cluster === mode.value?.cluster)) ||
      !clusterIndex.value?.list.find(cluster => cluster.number === mode.value?.cluster)
    ) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cluster Not Found',
        fatal: true
      })
    }
  } else if (mode.value.draftName) {
    // if this specific draft isn't in the final reviews data then 404
    if (!finalReview.value.items.some(item => item.name === mode.value?.draftName)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Draft Not Found',
        fatal: true
      })
    }
  }
}

const {
  data: queueIndex,
  status: queueIndexStatus,
  error: queueIndexError,
} = await useAsyncData(
  'queue-index',
  () => getQueueIndex(origin),
  {
    server: true,
    lazy: false
  }
)

const clusterQueue = computed((): QueueCommon | undefined => {
  if (!mode.value?.cluster) {
    return undefined
  }
  const clusterIndexItem = clusterIndex.value?.list.find(cluster => cluster.number === mode.value?.cluster)
  if (!clusterIndexItem) {
    return undefined
  }
  if (!finalReview.value) {
    throw Error('Expected final review to be available')
  }

  return {
    timestampIso: finalReview.value.timestampIso,
    items: clusterIndexItem.documents.map((clusterItem): QueueCommonItem => {
      const { name } = clusterItem

      const finalReviewItem = finalReview.value?.items.find(item => item.name === name)
      if (finalReviewItem) {
        return finalReviewItem
      }
      const queueItem = queueIndex.value?.items.find(item => item.name === name)
      if (!queueItem) {
        throw Error(`Cannot find queue item ${JSON.stringify(name)} in queue index.`)
      }
      return queueItem
    })
  }
})

useQueueRfcEditorHead({
  title: `${id.value} final review`,
  canonicalPath: canonicalPath.value,
  contentType: 'article'
})
</script>
