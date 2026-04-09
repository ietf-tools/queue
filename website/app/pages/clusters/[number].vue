<template>
  <div class="min-h-[100vh]">
    <NuxtLayout name="default">
      <div class="mx-auto container py-5">
        <ClusterPage v-if="clusterNumber" :cluster-number="clusterNumber" />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useQueueRfcEditorHead } from '~/utils/head'

const route = useRoute()

definePageMeta({
  layout: false,
  // Only allow numbers as route parameter, rejecting leading zeros or 'C' prefix
  validate: route => /^[1-9]\d*$/.test(route.params.number?.toString() ?? '')
})

const clusterNumber = computed(() => route.params.number ? parseInt(route.params.number.toString(), 10) : undefined)

const canonicalPath = computed(() => clusterNumber.value ? clusterNumberPathBuilder(clusterNumber.value) : undefined)

useQueueRfcEditorHead({
  title: 'Clusters of upcoming RFCs',
  canonicalPath: canonicalPath.value,
  contentType: 'article'
})
</script>