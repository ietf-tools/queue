<template>
  <Anchor
    :id="props.id"
    :href="props.href!"
    :class="ANCHOR_TAILWIND_STYLE"
  >
    <slot />
  </Anchor>
</template>

<script setup lang="ts">
import { ANCHOR_TAILWIND_STYLE } from '~/utils/theme'
const props = defineProps<{ href?: string; id?: string }>()
</script>