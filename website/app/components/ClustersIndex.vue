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

const {
  data,
  status,
  error,
} = await useAsyncData(
  'queue',
  getClusterIndex,
  {
    server: false,
    lazy: true,
  }
)

const columnHelper = createColumnHelper<ClusterItemCommon>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('number', {
    header: 'Cluster number',
    cell: data => {
      return h(Anchor, {
        href: `/cluster/${data.row.original.number}`,
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
      return h('span', { class: 'inline-flex flex-wrap gap-2' }, docs.map(document => {
        return h(ClustersIndexItem, { document })
      }))
    },
    enableSorting: false,
  }),
]

const table = useVueTable({
  get data() {
    console.log("rows", data.value?.list ?? [])
    return data.value?.list ?? []
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
