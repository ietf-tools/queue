<template>
  <span :class="[
    'font-semibold inline-block p-1 rounded-md',
    theme === 'isPublished'
      ? 'text-gray-600 bg-gray-100 dark:text-gray-500 dark:bg-gray-800'
      : theme === 'isNotReceived'
        ? 'bg-[#520b12] text-white'
        : 'text-black dark:text-gray-200'
  ]">
    <span v-if="props.document.rfcNumber">
      <span class="font-normal">RFC{{ NBSP }}</span>
      <span class="font-semibold">{{ `${props.document.rfcNumber}:${SPACE} ` }}</span>
    </span>
    <span class="font-mono font-normal mr-1">
      {{ props.document.name }}
    </span>
    <span class="inline-flex ml-2 gap-2 leading-2">
      <BaseBadge v-if="props.document.disposition === 'published'" color="green" title="(Disposition: published)">
        published
      </BaseBadge>
      <BaseBadge v-if="props.document.disposition === 'withdrawn'" color="blue" title="(Disposition: withdrawn)">
        withdrawn
      </BaseBadge>
      <BaseBadge v-if="props.document.disposition === 'created'" color="green" title="(Disposition: created)">created
      </BaseBadge>
      <BaseBadge v-if="props.document.disposition === 'in_progress'" color="blue" title="(Disposition: in progress)">in
        progress
      </BaseBadge>
      <BaseBadge v-if="props.document.isReceived" title="(Received)" color="pink">received</BaseBadge>
      <BaseBadge v-if="!props.document.isReceived" title="(Not Received)" color="orange">not received</BaseBadge>
    </span>
  </span>
</template>

<script setup lang="ts">
import { NBSP, SPACE } from '../utils/strings'

type Props = {
  document: ClusterDocumentCommon
}

const props = defineProps<Props>()

const theme = computed(() => {
  return props.document.disposition === 'published'
    ? 'isPublished'
    : props.document.isReceived === false
      ? 'isNotReceived'
      : 'isReceived'
})
</script>
