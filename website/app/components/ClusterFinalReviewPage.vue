<template>
  <div v-if="props.queue">
    <Heading level="1" class="mb-2">
      Cluster <span class="font-mono">{{ props.cluster }}</span> final review
      (formerly auth48)
    </Heading>
    <p v-if="clusterDrafts" class="italic">
      This cluster has {{ clusterDrafts.length }}.
      <template v-if="clusterDrafts.length === 1">draft.</template>
      <template v-else>drafts.</template>
    </p>
    <div class="py-1 px-2 bg-gray-700 dark:bg-gray-200">
      <p class="font-bold mb-1">Table of contents:</p>
      <ul class="mt-0 list-disc pl-6">
        <li v-for="(draft, index) in clusterDrafts" :key="draft.name" class="mb-6">
          <a :href="`#${makeDomId(draft.name, index)}`" :class="ANCHOR_TAILWIND_STYLE">{{ draft.name }}</a>
        </li>
      </ul>
    </div>
    <div v-for="(draft, index) in clusterDrafts" :key="draft.name" class="mb-6">
      <FinalReviewDraft heading-level="2" :draft-name="draft.name" :queue="props.queue" :id="makeDomId(draft.name, index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ANCHOR_TAILWIND_STYLE } from '../utils/theme'
import { makeDomId } from '../utils/final-review'

type Props = {
  queue?: QueueCommon
  cluster: number
}

const props = defineProps<Props>()

const clusterDrafts = computed(() => props.queue?.items.filter(item => item.clusters?.includes(props.cluster)))

</script>