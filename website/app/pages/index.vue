<template>
  <div class="min-h-[100vh]">
    <NuxtLayout name="default">
      <div class="mx-auto container text-right pt-5">
        <p class="text-sm text-grey-800 pr-3">
          Looking for published RFCs? Go to
          <Anchor :href="redSiteUrlOrigin" class="text-blue-300 dark:text-blue-100">
            {{ redSiteUrlOrigin }}
            <GraphicsNewWindowIcon class="align-middle" />
          </Anchor>
        </p>
      </div>
      <div class="container mx-auto">
        <Heading
          level="1"
          class="w-full mx-2 mb-2 text-gray-600 dark:text-gray-200 font-semibold text-balance">
          RFC Editor Queue
        </Heading>
        <QueueIndexTable :show-last-updated="true" />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useQueueRfcEditorHead } from '~/utils/head'
import { useRedSiteUrlOrigin } from '~/utils/url'

definePageMeta({
  layout: false
})

const redSiteUrlOrigin = useRedSiteUrlOrigin()

useQueueRfcEditorHead({
  title: 'Official queue of upcoming RFCs',
  canonicalPath: '/',
  contentType: 'article'
})
</script>
