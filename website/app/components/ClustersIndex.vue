<template>
  <div>
    <p class="text-sm pl-2 pb-1 mb-2">Total Number of Active clusters:
      <b v-if="data?.list">{{ data.list.length }}</b><i v-else>loading</i>.
    </p>
    <p class="text-sm pl-2 pb-2 mb-3">Number of clusters that contain one or more documents with
      "Reference
      Not Received":
      <b v-if="data?.list"> {{ stats.totalClustersWithDocumentsReferenceNotReceived }} </b>
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
    <p v-if="generatedAt" class="mt-12 text-sm italic text-gray-600 dark:text-gray-400">
      Last updated
      <TimeStamp :dateTime="generatedAt" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { SortingState } from '@tanstack/vue-table'
import { Anchor, ClustersIndexItem, Icon } from '#components'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'
import { getVNodeText } from '../utils/vue'
import type { ClusterDocumentCommon } from '../utils/validators'

const origin = usePublicSiteUrlOrigin()

const {
  data,
  status,
  error,
} = await useAsyncData(
  'clusters-index',
  () => getClusterIndex(origin),
  {
    server: false,
    lazy: true
  }
)

const { data: queueData } = await useAsyncData(
  'queue-index-for-clusters',
  () => getQueueIndex(origin),
  {
    server: false,
    lazy: true,
  }
)

const notReceivedByCluster = computed(() => {
  const map = new Map<number, ClusterDocumentCommon[]>()
  if (!queueData.value) return map
  for (const item of queueData.value.items) {
    if (!item.clusters || !item.references) continue
    const notReceivedRefs = item.references.filter(r => r.relationship === 'not-received')
    if (notReceivedRefs.length === 0) continue
    for (const clusterNumber of item.clusters) {
      const existing = map.get(clusterNumber) ?? []
      for (const ref of notReceivedRefs) {
        if (!existing.some(d => d.name === ref.targetDraftName)) {
          existing.push({
            name: ref.targetDraftName,
            isReceived: false,
            references: [],
          })
        }
      }
      map.set(clusterNumber, existing)
    }
  }
  return map
})

const generatedAt = computed(() => data.value?.timestampIso ? DateTime.fromISO(data.value.timestampIso) : undefined)

const columnHelper = createColumnHelper<ClusterItemCommon>()

const sorting = ref<SortingState>([])

const columns = [
  columnHelper.accessor('number', {
    header: 'Cluster',
    cell: data => {
      return h(Anchor, {
        href: clusterNumberPathBuilder(data.getValue()),
        'class': [ANCHOR_TAILWIND_STYLE, 'font-bold text-md whitespace-nowrap']
      }, () => [
        h('span', { class: 'sr-only' }, 'Cluster '),
        h(Icon, { name: 'pajamas:group', class: 'h-4 w-4 inline-block align-middle mr-1' }),
        data.getValue(),
      ])
    },
    sortingFn: (rowA, rowB) => {
      const aClusters = rowA.original.number ? [rowA.original.number] : []
      const bClusters = rowB.original.number ? [rowB.original.number] : []
      return sortClusters(aClusters, bClusters)
    },
  }),
  columnHelper.accessor('documents', {
    header: 'Documents',
    cell: data => {
      const clusterDocuments = data.getValue()
      const notReceivedClusterDocuments = (
        notReceivedByCluster.value.get(data.row.original.number) ?? []
      ).filter(notReceivedClusterDocument => {
        // filter if already in clusterDocuments, or else we'll get duplicate results below in `allClusterDocuments`
        return !clusterDocuments.find(
          clusterDocument => clusterDocument.name === notReceivedClusterDocument.name
        )
      })
      if (data.row.original.allPublished && notReceivedClusterDocuments.length === 0) {
        return h('span', 'All published')
      }
      const allClusterDocuments = [...clusterDocuments, ...notReceivedClusterDocuments]
      return h(
        'ul',
        { class: 'flex flex-col gap-2' },
        allClusterDocuments.map(clusterDocument => {
          return h('li', h(ClustersIndexItem, { clusterDocument }))
        })
      )
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

type StatKeys = 'totalClustersWithDocumentsReferenceNotReceived'

const stats = computed((): Record<StatKeys, number> => {
  if (!data.value) return {
    totalClustersWithDocumentsReferenceNotReceived: 0,
  }

  const totalClustersWithDocumentsReferenceNotReceived = data.value.list.map(item => item.documents
    .some(doc => !doc.isReceived))
    .reduce(
      (acc, clusterHasNotReceived) => acc + (clusterHasNotReceived ? 1 : 0), 0
    )

  return {
    totalClustersWithDocumentsReferenceNotReceived
  }
})
</script>
