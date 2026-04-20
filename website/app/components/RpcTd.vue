<template>
  <td :class="['px-1 align-top first:pl-3 last:pr-3 py-4 text-gray-500 dark:text-gray-200',
    props.textAlign === 'left' ? 'text-left' : '',
    props.textAlign === 'center' ? 'text-center' : '',
    props.textAlign === 'right' ? 'text-right' : '',
  ]">
    <slot />
  </td>
</template>

<script setup lang="ts">
type Props = {
  textAlign?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), { textAlign: 'left' })
</script>
