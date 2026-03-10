<template>
  <i v-if="status === 'pending'">
    Loading...
  </i>
  <div v-else-if="status === 'error'">
    {{ error }}
  </div>
  <div v-else-if="status === 'success' && clusterPackage">
    <DocumentDependenciesGraph :cluster="clusterPackage.cluster" />
    <QueueIndexTable :filter-by-cluster-number="props.clusterNumber" class="mt-3" />
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

const url = useRequestURL()

const { data: clusterPackage, error, status } = await useAsyncData(
  () => `cluster-${props.clusterNumber}`,
  () => getClusterPackage(url.hostname, props.clusterNumber),
  {
    server: true, // rendering on the server to generate real 404s for missing content
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
