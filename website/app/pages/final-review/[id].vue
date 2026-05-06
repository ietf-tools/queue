<template>
  <div class="container mx-auto my-6">
    <ClusterFinalReviewPage v-if="mode?.cluster" :cluster="mode.cluster" />
    <RfcFinalReviewDraftPage v-else-if="mode?.rfc" :rfc-number="mode.rfc" />
    <FinalReviewDraftPage v-else-if="mode?.draftName" heading-level="1" :id="mode.draftName"
      :draft-name="mode.draftName" />
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

  const rfc = id.value.match(/^rfc(\d+)$/i)
  if (rfc && rfc[1]) {
    return {
      rfc: parseInt(rfc[1], 10)
    }
  }

  const cluster = id.value.match(/^c(\d+)$/i)
  if (cluster && cluster[1]) {
    return {
      cluster: parseInt(cluster[1], 10)
    }
  }

  return {
    draftName: id.value,
  }
})
</script>
