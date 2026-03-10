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
    <p v-if="generatedAt" class="text-sm italic text-gray-600 dark:text-gray-400 mt-1">
      Last updated
      <TimeStamp :dateTime="generatedAt" />
    </p>
  </div>
</template>

<script setup lang="ts">
import type { SortingState } from '@tanstack/vue-table'
import { Anchor, ClustersIndexItem } from '#components'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'
import { getVNodeText } from '../utils/vue'
import { DateTime } from 'luxon'

const url = useRequestURL()

const {
  data,
  status,
  error,
} = await useAsyncData(
  'clusters-index',
  () => getClusterIndex(url.hostname),
  {
    server: false,
    lazy: true
  }
)

const generatedAt = computed(() => data.value?.generatedAtIso ? DateTime.fromISO(data.value.generatedAtIso) : undefined)

const columnHelper = createColumnHelper<ClusterItemCommon>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('number', {
    header: 'Cluster number',
    cell: data => {
      return h(Anchor, {
        href: clusterNumberPathBuilder(data.getValue()),
        'class': [ANCHOR_TAILWIND_STYLE, 'font-bold text-md whitespace-nowrap']
      }, () => [
        data.getValue(),
      ])
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('documents', {
    header: 'Members',
    cell: data => {
      const docs = data.getValue()
      if (data.row.original.allPublished) {
        return h('span', 'All published')
      }
      return h('ul', { class: 'inline-flex flex-wrap gap-2' }, docs.map(document => {
        return h('li', h(ClustersIndexItem, { document }))
      }))
    },
    enableSorting: false,
  }),
]

const emptyArray: ClusterItemCommon[] = []

const table = useVueTable({
  get data() {
    return data.value?.list ?? emptyArray // Need a const emptyArray rather than a new array every data(){} to prevent unnecessary rerenders / freezing
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

useHead({
  title: 'Clusters'
})
</script>
