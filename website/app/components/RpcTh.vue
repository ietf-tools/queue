<template>
  <th
    class="h-full sticky top-0 bg-gray-50 z-10 dark:bg-neutral-800 border-b-gray-300 border-b-1 dark:border-b-neutral-700 content-start "
    :aria-sort="
      props.sortDirection ? (props.sortDirection === 'asc' ? 'ascending' : 'descending') : undefined
    ">
    <div
      :class="[
        'flex h-full',
        {
          'text-left justify-start': props.textAlign === 'left',
          'text-center justify-center': props.textAlign === 'center',
          'text-right justify-end': props.textAlign === 'right'
        }
      ]">
      <span
        v-if="props.isSortable === undefined || props.isSortable === false"
s        class="text-gray-800 dark:text-gray-200">
        <slot />
      </span>
      <button
        v-else
        type="button"
        :class="[
          'w-full h-full cursor-pointer rounded-md px-1 py-1 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 dark:hover:text-gray-200 dark:focus:text-gray-200',
          {
            'text-shadow-sm text-shadow-white dark:text-shadow-black':
              props.sortDirection === 'asc' || props.sortDirection === 'desc'
          }
        ]"
        :title="`Sort by ${columnName}`">
        <slot />
        <Icon
          v-if="props.sortDirection === 'asc'"
          name="uil:arrow-up"
          class="inline-block  ml-2"
          size="1.3em" />
        <Icon
          v-else-if="props.sortDirection === 'desc'"
          name="uil:arrow-down"
          class="inline-block  mt-1 ml-2 "
          size="1.3em" />
        <Icon
          v-else
          name="heroicons:arrows-up-down"
          class="inline-block  mt-0.5 ml-2 "
          size="1.3em" />
      </button>
    </div>
  </th>
</template>

<script setup lang="ts">
type Props = {
  columnName?: string
  isSortable?: boolean
  sortDirection?: false | 'desc' | 'asc'
  textAlign?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), { textAlign: 'left' })
</script>
