<template>
  <i v-if="status === 'pending'">
    Loading...
  </i>
  <div v-else-if="status === 'error'">
    {{ error }}
  </div>
  <div v-else-if="status === 'success' && clusterPackage">
    <DocumentDependenciesGraph :cluster="clusterPackage.cluster" />
    <QueueIndexTable :filter-by-cluster-number="props.clusterNumber" />
  </div>
  <div v-else>
    <!-- 404 or unknown state -->
    Unknown cluster
  </div>
</template>

<script setup lang="ts">
type Props = {
  clusterNumber: number
}

const props = defineProps<Props>()

const { data: clusterPackage, error, status } = await useAsyncData(
  () => `cluster-${props.clusterNumber}`,
  () => getClusterPackage(props.clusterNumber),
  {
    server: false,
    lazy: true,
  }
)

if (status.value === 'success' && clusterPackage === undefined) {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
}

useHead({
  title: `Cluster ${props.clusterNumber}`
})

</script>
