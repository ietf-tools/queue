<template>
  <span>
    <template v-for="(token, i) in tokens" :key="i">
      <Anchor v-if="token.isLink" :href="token.toHref()" :class="ANCHOR_TAILWIND_STYLE">
        {{ token.v }}
        <Icon v-if="!isInternalLink(token.toHref())" name="fluent:window-new-20-regular" class="text-md align-middle" />
      </Anchor>
      <span v-else>{{ token.v }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { tokenize } from 'linkifyjs'

type Props = { html: string }

const props = defineProps<Props>()

const tokens = computed(() => tokenize(props.html))
</script>
