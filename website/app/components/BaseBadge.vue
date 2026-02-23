<template>
  <span :class="[
    'inline-flex items-center rounded-md px-2 py-0.5 font-medium ring-1 ring-inset',
    {
      'text-xs': props.size === 'xs',
      'text-lg': props.size === 'lg',
      'text-xl': props.size === 'xl',
    },
    badgeColors[props.color]
  ]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { ThemeColorCommon } from '../utils/validators'
import { badgeColors } from '../utils/badge'

type Props = {
  color: ThemeColorCommon,
  size?: 'xs' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'violet',
  size: 'xs'
})

</script>
