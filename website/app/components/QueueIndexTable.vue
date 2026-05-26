<template>
  <p class="text-sm pl-2 pb-3">
    Total number of queue items:
    <b v-if="data">{{ table.getRowCount() }}</b>
    <i v-else>loading</i>.
  </p>
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
  <p v-if="props.showLastUpdated && data?.timestampIso" class="mt-12 text-sm italic text-gray-600 dark:text-gray-400">
    Last updated
    <TimeStamp :dateTimeIso="data.timestampIso" />
  </p>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'
import type { SortingState } from '@tanstack/vue-table'
import { Anchor, Icon } from '#components'
import Label from './Label.vue'
import { getVNodeText } from '../utils/vue'
import { getQueueIndex } from '../utils/api'
import { calculateEnqueuedAtData, renderAssignmentsByRoles, renderEnqueuedAt, sortIsoDateStrings, sortLabels } from '~/utils/queue'
import { datatrackerDraftUrlBuilder } from '~/utils/url'
import { scrollToHashId } from '~/utils/scroll'

type Props = {
  filterByClusterNumber?: number,
  showFinalApprovalCounts?: boolean
  showClusters?: boolean
  showLastUpdated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showFinalApprovalCounts: false,
  showClusters: true,
})

const origin = usePublicSiteUrlOrigin()

const {
  data,
  status,
  error,
} = await useAsyncData(
  'queue-index',
  () => getQueueIndex(origin),
  {
    server: false,
    lazy: true
  }
)

const columnHelper = createColumnHelper<QueueCommonItem>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('name', {
    header: 'Document',
    cell: data => {
      return h(Anchor, {
        href: datatrackerDraftUrlBuilder(data.row.original.name),
        class: [
          ANCHOR_TAILWIND_STYLE,
          'scroll-m-20' // ensure link targets aren't obscured by sticky header https://mailarchive.ietf.org/arch/msg/tools-discuss/KYJF-QY2U4qXWS2UVL16vMO_qn4/
        ],
        rel: 'noopener',
        target: '_blank',
        id: data.row.original.name
      }, () => [
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
    sortingFn: (rowA, rowB) => {
      const aLabels = rowA.original.labels
      const bLabels = rowB.original.labels
      return sortLabels(aLabels, bLabels)
    },
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
    sortingFn: (rowA, rowB) => {
      const aIso = rowA.original.enqueuedAtIso
      const bIso = rowB.original.enqueuedAtIso
      return sortIsoDateStrings(aIso, bIso)
    },
  }),
  columnHelper.accessor(
    'assignmentsByRoles', {
    header: 'Status',
    cell: data => {
      const value = data.getValue()

      return renderAssignmentsByRoles({
        assignmentsByRoles: value,
        pendingActivities: data.row.original.pendingActivities,
        ianaStatus: data.row.original.ianaStatus,
        hideLinkDetails: false,
        linkFinalReviewsBy: data.row.original.rfcNumber ? {
          type: 'RFC_NUMBER',
          rfcNumber: data.row.original.rfcNumber
        } : {
          type: 'DRAFTNAME',
          draftName: data.row.original.name
        }
      })
    },
    sortingFn: (rowA, rowB) => {
      // Keeping the sort function in sync with the render function is important
      // so that similarly rendered items are sorted together.
      //
      // However this column's render function is more complicated than usual,
      // it returns h() render function with a lot of derived state, so we could
      // either:
      //
      //   1) manually keep custom sorting logic in sync with the visual rendering,
      //      or;
      //   2) stringify the h() render output and sort as strings
      //
      // The later has less maintenance burden so we'll try (2) until it doesn't work.
      const stringifyRenderAssignmentsByRoles = (row: QueueCommonItem): string => {
        const nodes = renderAssignmentsByRoles({
          assignmentsByRoles: row.assignmentsByRoles,
          pendingActivities: row.pendingActivities,
          ianaStatus: row.ianaStatus,
          hideLinkDetails: false,
          linkFinalReviewsBy: row.rfcNumber ? {
            type: 'RFC_NUMBER',
            rfcNumber: row.rfcNumber
          } : {
            type: 'DRAFTNAME',
            draftName: row.name
          }
        })
        return getVNodeText(nodes).replace(/\s+/g, ' ') // normalise whitespace
      }

      const textA = stringifyRenderAssignmentsByRoles(rowA.original)
      const textB = stringifyRenderAssignmentsByRoles(rowB.original)
      const textComparison = textA.localeCompare(textB)
      if (textComparison !== 0) {
        return textComparison
      }

      // https://github.com/ietf-tools/queue/issues/62
      // if the text is the same then order by weeks in queue
      const aIso = rowA.original.enqueuedAtIso
      const bIso = rowB.original.enqueuedAtIso
      return sortIsoDateStrings(aIso, bIso)
    },
  }),
  ...(props.showFinalApprovalCounts ? [
    columnHelper.accessor(
      'finalApprovalCounts', {
      header: 'Approvals Received',
      cell: data => {
        const value = data.getValue()
        if (!value) {
          return
        }
        return h('span', `${value.approved}/${value.total}`)
      },
      enableSorting: false,
    })] : []),
  ...(props.showClusters ? [
    columnHelper.accessor(
      'clusters', {
      header: 'Cluster',
      cell: data => {
        const clusters = data.getValue()
        if (!clusters) return undefined
        return h('span', clusters.map(cluster => {
          return h(
            Anchor,
            {
              href: `/clusters/${cluster}`,
              class: `${ANCHOR_TAILWIND_STYLE}`
            },
            () => [
              h(Icon, { name: 'pajamas:group', class: 'h-4 w-4 inline-block align-middle mr-1' }),
              String(cluster)
            ])
        }))
      },
      sortingFn: (rowA, rowB) => {
        const aClusters = rowA.original.clusters
        const bClusters = rowB.original.clusters
        return sortClusters(aClusters, bClusters)
      },
    })] : []),
]

const emptyArray: QueueCommonItem[] = []

const table = useVueTable({
  get data() {
    return data.value?.items ?? emptyArray // Need a const emptyArray rather than a new array every data(){} to prevent unnecessary rerenders / freezing
  },
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

watch(data, scrollToHashId)
</script>
