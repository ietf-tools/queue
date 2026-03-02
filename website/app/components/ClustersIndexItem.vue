<template>
  <Anchor :href="`/docs/${props.document.name}`" :class="[
    'font-semibold no-underline hover:underline focus:underline inline-block p-1 rounded-md',
    theme === 'isPublished'
      ? 'text-gray-600 bg-gray-100 dark:text-gray-500 dark:bg-gray-800'
      : theme === 'isNotReceived'
        ? 'bg-[#520b12] text-white'
        : 'text-gray-700 dark:text-gray-200'
  ]">
    <span v-if="props.document.rfcNumber">
      <span class="font-normal">RFC{{ NBSP }}</span>
      <span class="font-semibold">{{ `${props.document.rfcNumber}:${SPACE} ` }}</span>
    </span>
    <span class="font-mono font-normal">
      {{ props.document.name }}
    </span>
    <Icon v-if="props.document.disposition === 'published'" name="uil:books" title="(Disposition: published)" />
    <Icon v-if="props.document.disposition === 'withdrawn'" name="uil:border-clear" title="(Disposition: withdrawn)" />
    <Icon v-if="props.document.disposition === 'created'" name="uil:bookmark-full" title="(Disposition: created)" />
    <Icon v-if="props.document.disposition === 'in_progress'" name="uil:brain" title="(Disposition: in progress)" />
    <Icon v-if="props.document.isReceived" name="uil:envelope-receive" title="(Received)"/>
    <Icon v-if="!props.document.isReceived" name="uil:envelope-block" title="(Not Received)"/>
  </Anchor>
</template>

<script setup lang="ts">
import { Anchor } from '#components'
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
