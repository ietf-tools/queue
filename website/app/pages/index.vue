<template>
  <div class="min-h-[100vh]">
    <NuxtLayout name="default">
      <div class="mx-auto container text-right py-5">
        <p class="text-sm text-grey-800 pr-3">
          Looking for published RFCs? Go to
          <Anchor :href="redSiteUrlOrigin" class="text-blue-300 dark:text-blue-100">
            {{ redSiteUrlOrigin }}
            <Icon name="fluent:window-new-20-regular" size="1.25em"
              class="text-gray-700 dark:text-neutral-300 ml-1 align-middle" />
          </Anchor>.
        </p>
      </div>
      <div class="container mx-auto">
        <Heading level="1" style-level="3"
          class="w-full mx-2 mb-2 md:mb-3 text-gray-600 dark:text-gray-200 font-semibold text-balance">
          Upcoming RFCs Queue
        </Heading>
        <QueueIndexTable />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useQueueRfcEditorHead } from '~/utils/head';
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