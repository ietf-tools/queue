<template>
  <div class="container mx-auto my-6">
    <ClusterFinalReviewPage v-if="mode?.cluster" :cluster="mode.cluster" :queue="data" />
    <FinalReviewDraft v-if="mode?.draftName" heading-level="1" :draft-name="mode.draftName" :queue="data" />
  </div>
</template>

<script setup lang="ts">
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

  const cluster = id.value.match(/c(\d+)/i)

  if (!cluster || !cluster[1]) {
    return {
      draftName: id.value,
    }
  }

  return {
    cluster: parseInt(cluster[1], 10)
  }
})

const url = useRequestURL()

const canonicalPath = computed(() => {
  if (!mode.value) return undefined
  if (mode.value.cluster) {
    return `/final-review/C${mode.value.cluster}/`
  }
  if (mode.value.draftName) {
    return `/final-review/${mode.value.draftName}/`
  }
})

if (id.value && route.fullPath !== canonicalPath.value) {
  await navigateTo({
    path: canonicalPath.value
  })
}

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

if (!data.value || status.value === 'success' && !data.value || status.value === 'error') {
  console.error(`[404] ${id}`, status.value, error.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}

useHead({
  title: `${id} final review`
})
</script>