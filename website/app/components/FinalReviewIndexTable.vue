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
    </RpcTable>
  </div>
</template>

<script setup lang="ts">
import { Anchor, Icon } from '#components'
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
import Label from './Label.vue'
import { finalReviewPathBuilder } from '~/utils/url'
import type { QueueCommonItem } from '~/utils/validators'

type UseAsyncDataReturn = Awaited<ReturnType<typeof useAsyncData>>
type UseAsyncDataStatus = UseAsyncDataReturn['status']['value']
type UseAsyncDataError = UseAsyncDataReturn['error']['value']

type Props = {
  queueItems?: QueueCommonItem[]
  status: UseAsyncDataStatus
  error: UseAsyncDataError
}

const props = defineProps<Props>()

const columnHelper = createColumnHelper<QueueCommonItem>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('rfcNumber', {
    header: 'RFC-to-be',
    cell: data => {
      return h(
        Anchor,
        {
          href: data.row.original.rfcNumber
            ? rfcFinalReviewPathBuilder(data.row.original.rfcNumber)
            : finalReviewPathBuilder(data.row.original.name),
          class: `${ANCHOR_TAILWIND_STYLE} underline`
        }, () => [
          h('span', { class: 'font-normal' }, `RFC-to-be${NBSP}`),
          h('span', { class: 'font-semibold' }, data.getValue()),
        ]
      )
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('name', {
    header: 'Document',
    cell: data => data.getValue(),
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor(
    'labels', {
    header: 'Labels',
    cell: data => {
      const labels = data.getValue()
      if (!labels) return undefined
      return h('ul', { class: 'inline-flex flex-wrap gap-2' }, labels.map(label => {
        return h('li', { class: 'inline' }, h(Label, { label }))
      }))
    },
    sortingFn: (rowA, rowB) => {
      const aLabels = rowA.original.labels
      const bLabels = rowB.original.labels
      return sortLabels(aLabels, bLabels)
    },
  }),
  columnHelper.accessor(
    'clusters', {
    header: 'Cluster',
    cell: data => {
      const clusters = data.getValue()
      if (!clusters) {
        return undefined
      }
      return h('ul', { class: 'inline-flex flex-wrap gap-2' }, clusters.map(clusterNumber => {
        return h('li', { class: 'inline' },
          h(
            Anchor,
            {
              href: clusterFinalReviewPathBuilder(clusterNumber),
              class: `${ANCHOR_TAILWIND_STYLE} underline`
            },
            () => [
              h(Icon, { name: 'pajamas:group', class: 'h-4 w-4 inline-block align-middle mr-1' }),
              clusterNumber
            ]
          )
        )
      }))
    },
    sortingFn: (rowA, rowB) => {
      const aClusters = rowA.original.clusters
      const bClusters = rowB.original.clusters
      return sortClusters(aClusters, bClusters)
    },
  }),
]

const emptyArray: QueueCommonItem[] = []

const table = useVueTable({
  get data() {
    return props.queueItems ?? emptyArray // Need a const emptyArray rather than a new array every data(){} to prevent unnecessary rerenders / CPU lock up churn / app freeze
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
      if (!nameMatch) {
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
</script>
