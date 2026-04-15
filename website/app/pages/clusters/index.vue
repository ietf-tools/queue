<template>
  <div class="min-h-[100vh]">
    <NuxtLayout name="default">
      <div class="container mx-auto">
        <Heading level="1" style-level="3"
          class="w-full mx-2 mb-2 md:mb-3 text-gray-600 dark:text-gray-200 font-semibold text-balance">
          Clusters
        </Heading>
        <ClustersIndex />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useQueueRfcEditorHead } from '~/utils/head';
import { CLUSTERS_PATH } from '~/utils/url';

definePageMeta({
  layout: false
})

useQueueRfcEditorHead({
  title: 'Clusters of upcoming RFCs',
  canonicalPath: CLUSTERS_PATH,
  contentType: 'article'
})
</script>