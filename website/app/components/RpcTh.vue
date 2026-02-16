<template>
  <th
    class="px-1 first:pl-3 last:pr-3 py-3.5 text-left text-sm  content-start font-semibold text-gray-900 dark:text-neutral-400"
    :aria-sort="props.sortDirection ? props.sortDirection === 'asc' ? 'ascending' : 'descending' : undefined"
  >
    <span class="text-gray-800 dark:text-neutral-400">
      <slot />
    </span>
    <button v-if="props.isSortable" type="button" :class="[
      'inline-block flex items-center justify-center w-[2em] h-[2em] -pb-1 rounded-md ml-2 cursor-pointer text-gray-400 dark:text-neutral-400 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 dark:hover:text-gray-200 dark:focus:text-gray-200 px-1 py-1',
      props.sortDirection === 'asc' || props.sortDirection === 'desc' ? 'inset-shadow-sm inset-shadow-gray-300 bg-gray-200' : ''
    ]" :title="`Sort by ${columnName}`">
      <Icon v-if="props.sortDirection === 'asc'" name="uil:arrow-up" class="inline-block text-gray-900 dark:text-gray-100 text-lg" size="1.2em" />
      <Icon v-else-if="props.sortDirection === 'desc'" name="uil:arrow-down" class="inline-block text-gray-900 dark:text-gray-100 text-lg" size="1.2em" />
      <Icon v-else name="heroicons:arrows-up-down" class="inline-block text-lg" size="1.2em" />
    </button>
  </th>
</template>

<script setup lang="ts">
type Props = {
  columnName?: string
  isSortable?: boolean
  sortDirection?: false | "desc" | "asc"
}

const props = defineProps<Props>()
</script>
