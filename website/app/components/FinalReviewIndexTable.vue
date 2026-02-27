<template>
  <div>
    <RpcTable>
      <RpcThead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <RpcTh v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
            :is-sortable="header.column.getCanSort()" :sort-direction="header.column.getIsSorted()"
            :column-name="getVNodeText(header.column.columnDef.header)"
            @click="header.column.getToggleSortingHandler()?.($event)">
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()" />
          </RpcTh>
        </tr>
      </RpcThead>
      <RpcTbody>
        <RpcRowMessage :status="status" :error="error" :column-count="table.getAllColumns().length"
          :row-count="table.getRowModel().rows.length" />
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <RpcTd v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </RpcTd>
        </tr>
      </RpcTbody>
      <RpcTfoot>
        <tr v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
          <RpcTh v-for="header in footerGroup.headers" :key="header.id" :colSpan="header.colSpan">
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.footer"
              :props="header.getContext()" />
          </RpcTh>
        </tr>
      </RpcTfoot>
    </RpcTable>
  </div>
</template>

<script setup lang="ts">
import { Anchor } from '#components'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'
import type { SortingState } from '@tanstack/vue-table'
import { getVNodeText } from '../utils/vue'

const {
  data,
  status,
  error,
} = await useAsyncData(
  'queue',
  async () => [],
  {
    server: false,
    lazy: true,
    default: () => [],
  }
)

type SomeQueueType = {
  id: string
  rfcNumber?: number
  labels?: string[]
  name: string
  clusters?: number[]
}

const columnHelper = createColumnHelper<SomeQueueType>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('name', {
    header: 'Document',
    cell: data => {
      return h(Anchor, { href: `/docs/${data.row.original.name}`, 'class': ANCHOR_TAILWIND_STYLE }, () => [
        data.getValue(),
      ])
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('rfcNumber', {
    header: 'RFC Number',
    cell: data => data.getValue(),
    sortingFn: 'alphanumeric',
    sortUndefined: 'last',
  }),
  columnHelper.accessor(
    'labels', {
    header: 'Labels',
    cell: data => {
      const labels = data.getValue()
      if (!labels) return undefined
      return 'test'
    },
    enableSorting: false,
  }),

]

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  state: {
    get globalFilter() {
      return JSON.stringify([
        searchQuery.value
      ])
    },
    get sorting() {
      return sorting.value
    },
  },
  globalFilterFn: (row) => {
    const d = row.original

    // Search filter
    if (searchQuery.value && searchQuery.value.trim()) {
      const searchTerm = searchQuery.value.trim().toLowerCase()
      const nameMatch = d.name?.toLowerCase().includes(searchTerm)
      const rfcMatch = d.rfcNumber?.toString().toLowerCase().includes(searchTerm)
      if (!nameMatch && !rfcMatch) {
        return false
      }
    }

    return true
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

const searchQuery = ref('')

const route = useRoute()

onMounted(() => {
  if (route.query.search && route.query.search !== searchQuery.value) {
    searchQuery.value = route.query.search as string
  }
})

useHead({
  title: 'RPC Queue'
})
</script>
