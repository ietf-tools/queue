<template>
  <i v-if="status === 'pending'">
    Loading...
  </i>
  <div v-else-if="status === 'error'">
    {{ error }}
  </div>
  <div v-else-if="status === 'success' && clusterRoot">
    <DocumentDependenciesGraph :cluster="clusterRoot.cluster" :rfc-to-bes="clusterRoot.rfcToBes" />
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

const { data: clusterRoot, error, status } = await useAsyncData(
  () => `cluster-${props.clusterNumber}`,
  () => getCluster(props.clusterNumber)
)

if (status.value === 'success' && clusterRoot === undefined) {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
}

useHead({
  title: `Cluster ${props.clusterNumber}`
})

</script>
