<template>
  <HoverCardRoot v-model:open="isHoverCardOpen">
    <HoverCardTrigger as-child>
      <button
        class="mt-10 px-4 -ml-2 py-2 text-sm italic border border-transparent focus:border focus:border-gray-400 text-gray-600 dark:text-gray-400 rounded-md"
        @focus="isHoverCardOpen = true" @mouseover="isHoverCardOpen = true" @blur="isHoverCardOpen = false">
        <time :datetime="props.dateTime.toISO() ?? undefined">
          {{ relativeDate }}
        </time>
      </button>
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="border shadow-sm overflow-x-hidden rounded-md bg-white dark:bg-black border-gray-400 dark:border-white px-3 py-2">
        <p class="italic font-bold">{{ fullDate }}</p>
        <HoverCardArrow class="fill-gray-200 stroke-gray-500 -mt-[1px]" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
  <p class="hidden print:block italic font-semibold">
    {{ relativeDate }}, {{ fullDate }}
  </p>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

type Props = {
  dateTime: DateTime
}

const props = defineProps<Props>()

// eg. X years ago
const relativeDate = computed(() => props.dateTime.toRelativeCalendar())

const fullDate = computed(() => props.dateTime.toLocaleString(DateTime.DATETIME_FULL))

const isHoverCardOpen = ref(false)
</script>