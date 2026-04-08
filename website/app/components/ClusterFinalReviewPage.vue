<template>
  <div v-if="props.queue">
    <Heading level="1">Cluster <span class="font-mono">{{ props.cluster }}</span> final review</Heading>
    <div v-for="draft in clusterDrafts" :key="draft.name">
      <FinalReviewDraft heading-level="2" :draft-name="draft.name" :queue="props.queue" />
    </div>
  </div>
</template>

<script setup lang="ts">

type Props = {
  queue?: QueueCommon
  cluster: number
}

const props = defineProps<Props>()

const clusterDrafts = computed(() => props.queue?.items.filter(item => item.clusters?.includes(props.cluster)))
</script>