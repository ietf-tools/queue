<template>
  <div class="container mx-auto my-6">
    <Heading level="1" style-level="3"
      class="w-full mx-2 mb-2 md:mb-3 text-gray-600 dark:text-gray-200 font-semibold text-balance">
      Final Review (formerly auth48)
    </Heading>
    <FinalReviewIndexTable />
  </div>
</template>

<script setup lang="ts">
import { useQueueRfcEditorHead } from '~/utils/head';
import { FINAL_REVIEW_PATH } from '~/utils/url';

useQueueRfcEditorHead({
  title: 'Final Review of upcoming RFCs',
  canonicalPath: FINAL_REVIEW_PATH,
  contentType: 'article'
})
</script>