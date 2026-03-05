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
import Label from './Label.vue'
import { getVNodeText } from '../utils/vue'
import { getQueueIndex } from '../utils/api'
import { calculateEnqueuedAtData, renderEnqueuedAt } from '~/utils/queue'
import { DateTime } from 'luxon'
import BaseBadge from './BaseBadge.vue'
import { datatrackerDraftUrlBuilder } from '~/utils/url'

type Props = {
  filterByClusterNumber?: number
}

const props = defineProps<Props>()

const emptyArray: QueueCommonItem[] = []

const {
  data,
  status,
  error,
} = await useAsyncData(
  'queue-index',
  getQueueIndex,
  {
    server: false,
    lazy: true,
    default: () => emptyArray
  }
)

const columnHelper = createColumnHelper<QueueCommonItem>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('name', {
    header: 'Document',
    cell: data => {
      return h(Anchor, { href: datatrackerDraftUrlBuilder(data.row.original.name), 'class': ANCHOR_TAILWIND_STYLE, target: TARGET_NEW_WINDOW, rel: EXTERNAL_LINK_REL }, () => [
        data.getValue(),
        h(Icon, { name: 'fluent:window-new-20-regular', size: "1.25em", class: "text-gray-700 dark:text-neutral-300 ml-1 align-middle" }),
      ])
    },
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
    enableSorting: false,
  }),
  columnHelper.accessor(
    'enqueuedAtIso', {
    header: () => h('div', { class: 'text-center' }, [
      h('div', 'Enqueue Date'),
      h('div', { class: "text-xs" }, '(Weeks in queue)')
    ]),
    cell: data => {
      const value = data.getValue()
      if (!value) return ''
      const dateTime = DateTime.fromISO(value)
      const enqueuedAtData = calculateEnqueuedAtData(dateTime.toJSDate())
      return renderEnqueuedAt(enqueuedAtData)
    },
    sortingFn: (rowA, rowB, columnId) => {
      const now = DateTime.now()

      const aIso = rowA.getValue(columnId)
      if (typeof aIso !== 'string') {
        console.error("Not string was", typeof aIso, aIso)
        throw Error(`Expected string (iso date string) but was something else. See console.`)
      }
      const aDateTime = DateTime.fromISO(aIso)
      const aDiffInDays = now.diff(aDateTime, 'days').days

      const bIso = rowB.getValue(columnId)
      if (typeof bIso !== 'string') {
        console.error("Not string was", typeof bIso, bIso)
        throw Error(`Expected string (iso date string) but was something else. See console.`)
      }
      const bDateTime = DateTime.fromISO(bIso)
      const bDiffInDays = now.diff(bDateTime, 'days').days

      return (aDiffInDays > bDiffInDays) ? 1 : (aDiffInDays < bDiffInDays) ? -1 : 0
    },
  }),
  columnHelper.accessor(
    'assignmentsByRoles', {
    header: 'Assignments',
    cell: data => {
      const value = data.getValue()
      if (!value) {
        return
      }
      return h('ul', value.map(assignmentsByRole => {
        return h('li', { class: 'inline-flex flex-wrap items-center gap-1' }, [
          h(BaseBadge, { class: '' }, assignmentsByRole.role.replace(/_/g, ' ')),
          assignmentsByRole.blockingReasons ? h('span', { class: 'text-xs text-gray-500 dark:text-neutral-400' },
            assignmentsByRole.blockingReasons.map(blockingReason =>
              blockingReason.reason.name
            )) : null,
        ])
      }))
    }
  }),
  columnHelper.accessor(
    'ianaStatus', {
    header: () => h('span', [
      h('abbr', { class: 'no-underline', title: 'Internet Assigned Numbers Authority' }, 'IANA'),
      ' status'
    ]),
    cell: data => {
      const value = data.getValue()
      if (!value) {
        return
      }
      return h('span', value.description)
    },
    enableSorting: false,
  }),
  columnHelper.accessor(
    'clusters', {
    header: 'Cluster',
    cell: data => {
      const clusters = data.getValue()
      if (!clusters) return undefined
      return h('span', clusters.map(cluster => {
        return h(Anchor, { href: `/clusters/${cluster}` }, () => [
          h(Icon, { name: 'pajamas:group', class: 'h-5 w-5 inline-block mr-1' }),
          String(cluster)
        ])
      }))
    },
    sortingFn: (rowA, rowB, columnId) => {
      const clustersA = rowA.getValue(columnId)
      const clustersB = rowB.getValue(columnId)
      const a = Array.isArray(clustersA) && clustersA.length > 0 ? clustersA[0] : undefined
      const b = Array.isArray(clustersB) && clustersB.length > 0 ? clustersB[0] : undefined
      if (a === undefined && b === undefined) {
        return 1
      } else if (a === undefined) {
        return 1
      } else if (b === undefined) {
        return 1
      }
      return a - b
    },
  }),

]

const table = useVueTable({
  data,
  columns,
  state: {
    get globalFilter() {
      return JSON.stringify([
        props.filterByClusterNumber
      ])
    },
    get sorting() {
      return sorting.value
    },
  },
  globalFilterFn: (row) => {
    if (props.filterByClusterNumber) {
      if (!row.original.clusters) {
        return false
      }
      return row.original.clusters.some(cluster => cluster === props.filterByClusterNumber)
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

useHead({
  title: 'RPC Queue'
})
</script>
