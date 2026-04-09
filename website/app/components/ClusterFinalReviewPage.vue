<template>
  <div v-if="props.queue">
    <Heading level="1" class="mb-2">
      Cluster <span class="font-mono">{{ props.cluster }}</span> final review
      (formerly auth48)
    </Heading>
    <p v-if="clusterDrafts" class="italic">
      This cluster has {{ clusterDrafts.length }}
      {{ SPACE }}
      <template v-if="clusterDrafts.length === 1">draft.</template>
      <template v-else>drafts.</template>
    </p>
    <div class="mt-4 mb-8 py-2 px-4 sm:rounded-lg bg-gray-200 dark:bg-gray-800 text-sm max-w-md">
      <p class="font-bold">Table of contents:</p>
      <ul class="mt-0 list-disc pl-6 text-black dark:text-white">
        <li v-for="(draft, index) in clusterDrafts" :key="draft.name">
          <a :href="`#${makeDomId(draft.name, index)}`" :class="[ANCHOR_TAILWIND_STYLE, 'wrap-anywhere']">{{ draft.name }}</a>
        </li>
      </ul>
    </div>
    <div v-for="(draft, index) in clusterDrafts" :key="draft.name" class="mb-6">
      <FinalReviewDraft heading-level="2" :draft-name="draft.name" :queue="props.queue"
        :id="makeDomId(draft.name, index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SPACE } from '../utils/strings'
import { ANCHOR_TAILWIND_STYLE } from '../utils/theme'
import { makeDomId } from '../utils/final-review'

type Props = {
  queue?: QueueCommon
  cluster: number
}

const props = defineProps<Props>()

const clusterDrafts = computed(() => props.queue?.items.filter(item => item.clusters?.includes(props.cluster)))

</script>