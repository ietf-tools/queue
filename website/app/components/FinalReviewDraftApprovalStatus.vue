<template>
  <Heading :level="props.headingLevel" :style-level="headingLevelPlusOne"
    class="mt-3 mb-2 text-gray-600 dark:text-gray-200 font-semibold text-balance">Approval Status</Heading>
  <RpcTable v-if="props.finalReviewDraft.actionholderSet">
    <RpcThead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <RpcTh v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
          :is-sortable="header.column.getCanSort()" :sort-direction="header.column.getIsSorted()"
          :column-name="getVNodeText(header.column.columnDef.header)"
          :text-align="header.id === 'approvalStatus' ? 'center' : 'left'"
          @click="header.column.getToggleSortingHandler()?.($event)">
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
  <p v-else class="italic">No final approvals available.</p>
</template>

<script setup lang="ts">
import { clamp } from 'es-toolkit'
import type { SortingState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'
import type { FinalReviewDraft } from '~/utils/final-review'
import type { FinalApproval } from '../utils/validators'
import Header from './Header.vue'

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

const columnHelper = createColumnHelper<FinalApproval>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('approverName', {
    header: 'Approver Name',
    cell: data => {
      const value = data.getValue()
      return value ?? h('i', '(no name)')
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('comment', {
    header: 'Approver Comment',
    cell: data => {
      const value = data.getValue()
      return value ?? h('i', '(no comment)')
    },
    enableSorting: false,
  }),
  columnHelper.accessor('approvedAtIso', {
    header: 'Approval Status',
    id: 'approvalStatus',
    cell: data => {
      const value = data.getValue()
      if (value) {
        return h('div', { class: 'text-center' },
          h('abbr', { title: "Yes", class: "no-underline px-2 py-1" }, 'Y')
        )
      }
      return h('div', { class: 'text-center' },
        h('abbr', { title: "No", class: "no-underline px-2 py-1" }, 'N')
      )
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('approvedAtIso', {
    header: 'Date Approved',
    id: 'dateApproved',
    cell: data => {
      const value = data.getValue()
      if (!value) {
        return h('i', '(no available)')
      }
      return h('time', { datetime: value }, value.split("T")[0])
    },
    sortingFn: 'alphanumeric',
  }),
]

const emptyArray: FinalApproval[] = []

const table = useVueTable({
  get data() {
    return props.finalReviewDraft.finalApprovals ?? emptyArray // Need a const emptyArray rather than a new array every data(){} to prevent unnecessary rerenders / freezing
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