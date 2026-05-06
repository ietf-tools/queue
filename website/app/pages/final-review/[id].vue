<template>
  <div class="container mx-auto my-6">
    <ClusterFinalReviewPage v-if="mode?.cluster" :cluster="mode.cluster" />
    <FinalReviewDraftPage v-if="mode?.draftName" heading-level="1" :id="mode.draftName" :draft-name="mode.draftName" />
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
</script>
