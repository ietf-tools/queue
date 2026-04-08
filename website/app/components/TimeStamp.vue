<template>
  <HoverCardRoot v-model:open="isHoverCardOpen" v-if="theDateTime && fullDate && relativeDate">
    <HoverCardTrigger as-child>
      <button class="-ml-1 px-1 py-1 border border-transparent focus:border focus:border-gray-400 rounded-md"
        @focus="isHoverCardOpen = true" @mouseover="isHoverCardOpen = true" @blur="isHoverCardOpen = false">
        <time :datetime="theDateTime.toISO() ?? undefined">
          {{ relativeDate }}
        </time>
      </button>
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="border shadow-sm overflow-x-hidden rounded-md bg-white dark:bg-black border-gray-400 dark:border-white px-3 py-2">
        <p class="font-bold">{{ fullDate }}</p>
        <HoverCardArrow class="fill-white stroke-gray-500 -mt-[1px]" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
  <span v-if="relativeDate && fullDate" class="hidden print:block italic font-semibold">
    {{ relativeDate }}, {{ fullDate }}
  </span>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

type Props = {
  dateTime?: DateTime
  dateTimeIso?: string
}

const props = defineProps<Props>()

const theDateTime = computed(() => {
  if(props.dateTime) {
    return props.dateTime
  }
  if(props.dateTimeIso) {
    return DateTime.fromISO(props.dateTimeIso)
  }
  return undefined
})

// eg. X years ago
const relativeDate = computed(() => theDateTime.value?.toRelativeCalendar())

const fullDate = computed(() => theDateTime.value?.toLocaleString(DateTime.DATETIME_FULL))

const isHoverCardOpen = ref(false)
</script>