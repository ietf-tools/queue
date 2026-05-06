<template>
  <template v-if="finalReviewCluster">
    <Heading level="1" style-level="3"
      class="w-full mx-2 mb-2 md:mb-3 text-gray-600 dark:text-gray-200 font-semibold text-balance">
      Cluster <span class="font-mono">{{ props.cluster }}</span> final review
      (formerly auth48)
    </Heading>
    <p class="mx-2 italic">
      This cluster has {{ finalReviewCluster.items.length }}
      {{ SPACE }}
      <template v-if="finalReviewCluster.items.length === 1">draft.</template>
      <template v-else>drafts.</template>
    </p>
    <div class="mt-4 mb-8 pt-2 pb-3 px-2 sm:rounded-lg bg-gray-200 dark:bg-gray-800 text-sm max-w-md">
      <p class="font-bold px-1">Table of contents:</p>
      <ul class="mt-0 list-disc pl-6 text-black dark:text-white">
        <li v-for="(draft, index) in finalReviewCluster.items" :key="draft.name">
          <a :href="`#${makeDomId(draft.name, index)}`" :class="[ANCHOR_TAILWIND_STYLE, 'wrap-anywhere']">
            {{ draft.name }}
          </a>
        </li>
      </ul>
    </div>
    <div v-if="finalReviewCluster" v-for="(draft, index) in finalReviewCluster.items" :key="draft.name"
      class="mb-6 mx-2">
      <FinalReviewDraft heading-level="2" :draft-name="draft.name" :queue="finalReviewCluster"
        :id="makeDomId(draft.name, index)" />
    </div>

    <hr class="mt-12" />
    <p v-if="finalReviewCluster.timestampIso" class="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
      Last updated
      <TimeStamp :dateTimeIso="finalReviewCluster.timestampIso" />
    </p>
  </template>
</template>

<script setup lang="ts">
import { SPACE } from '../utils/strings'
import { ANCHOR_TAILWIND_STYLE } from '../utils/theme'
import { makeDomId } from '../utils/final-review'
import { getFinalReviewCluster } from '~/utils/api'

type Props = {
  cluster: number
}

const props = defineProps<Props>()

const origin = usePublicSiteUrlOrigin()

const {
  data: finalReviewCluster,
  status: finalReviewClusterStatus,
  error: finalReviewClusterError,
} = await useAsyncData(
  'clusters-index',
  () => getFinalReviewCluster(origin, props.cluster),
  {
    server: true, // server because we want real 404s
    lazy: false
  }
)

if (!finalReviewCluster.value || typeof finalReviewCluster.value.clusterNumber !== 'number') {
  throw createError({
    statusCode: 404,
    statusMessage: `Final review for cluster ${props.cluster} not found`,
    fatal: true
  })
}

const route = useRoute()

const canonicalPath = computed(() => `/final-review/C${props.cluster}/`)

if (
  // only compare route.path not route.fullPath as that will clobber ?search#id params
  route.path !== canonicalPath.value
) {
  await navigateTo({
    path: canonicalPath.value
  })
}

useQueueRfcEditorHead({
  title: `Cluster ${props.cluster} final review`,
  canonicalPath: canonicalPath.value,
  contentType: 'article'
})
</script>