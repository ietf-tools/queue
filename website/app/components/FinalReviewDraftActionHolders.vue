<template>
  <Heading :level="props.headingLevel" :style-level="headingLevelPlusOne"
    class="mt-3 mb-2 text-gray-600 dark:text-gray-200 font-semibold text-balance">Action Holders</Heading>
  <RpcTable v-if="props.finalReviewDraft.actionholderSet">
    <RpcThead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <RpcTh v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
          :is-sortable="header.column.getCanSort()" :sort-direction="header.column.getIsSorted()"
          :column-name="getVNodeText(header.column.columnDef.header)"
          @click="header.column.getToggleSortingHandler()?.($event)"
          :text-align="header.id === 'approvalStatus' ? 'center' : 'left'"
          >
          <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
            :props="header.getContext()" />
        </RpcTh>
      </tr>
    </RpcThead>
    <RpcTbody>
      <RpcRowMessage :column-count="table.getAllColumns().length" :row-count="table.getRowModel().rows.length" />
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <RpcTd v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </RpcTd>
      </tr>
    </RpcTbody>
  </RpcTable>
  <p v-else class="italic text-sm">No action holders available.</p>
</template>

<script setup lang="ts">
import type { SortingState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'
import { clamp } from 'es-toolkit'
import type { FinalReviewDraft } from '~/utils/final-review'
import type { ActionHolder } from '../utils/validators'

type Props = {
  headingLevel: HeadingLevel
  finalReviewDraft: FinalReviewDraft
}

const props = defineProps<Props>()

const headingLevelPlusOne = computed((): HeadingLevel => {
  return (
    clamp(
      parseInt(props.headingLevel, 10) + 1,
      1,
      6
    )
  ).toString() as HeadingLevel
})

const columnHelper = createColumnHelper<ActionHolder>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('person.name', {
    header: 'Action Holder Name',
    cell: (data) => {
      const value = data.getValue()
      return value ?? h('i', '(unnamed)')
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('comment', {
    header: 'Comment',
    cell: (data) => {
      const value = data.getValue()
      return value ?? h('i', '(no comment)')
    },
    enableSorting: false,
  }),
  columnHelper.accessor('sinceWhenIso', {
    header: 'Date Requested',
    cell: (data) => {
      const value = data.getValue()
      if (!value) {
        return h('i', '(no date)')
      }
      return renderIsoDateAsTooltipComponent(value)
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('completedIso', {
    header: 'Approval Status',
    cell: (data) => {
      const value = data.getValue()
      if (!value) {
        return h('i', '(pending])')
      }
      return renderIsoDateAsTooltipComponent(value)
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('deadlineIso', {
    header: 'Deadline',
    cell: (data) => {
      const value = data.getValue()
      if (!value) {
        return h('i', '(no date)')
      }
      return renderIsoDateAsTooltipComponent(value)
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('body', {
    header: 'Body',
    cell: (data) => {
      const value = data.getValue()
      if (!value) {
        return h('i', '(no body)')
      }
      return value
    },
    sortingFn: 'alphanumeric',
  }),
]

const emptyArray: ActionHolder[] = []

const table = useVueTable({
  get data() {
    const { actionholderSet } = props.finalReviewDraft
    return actionholderSet ?? emptyArray // Need a const emptyArray rather than a new array every data(){} to prevent unnecessary rerenders / freezing
  },
  columns,
  state: {
    get sorting() {
      return sorting.value
    },
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
})
</script>