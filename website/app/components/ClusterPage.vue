<template>
  <i v-if="status === 'pending'">
    Loading...
  </i>
  <div v-else-if="status === 'error'">
    {{ error }}
  </div>
  <div v-else-if="status === 'success' && cluster">
    <DocumentDependenciesGraph :cluster="cluster" />
  </div>
  <div v-else>
    Unknown cluster
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Only allow numbers as route parameter, rejecting leading zeros or 'C' prefix
definePageMeta({ validate: route => /^[1-9]\d*$/.test(route.params.number?.toString() ?? '') })

const clusterNumber = computed(() => route.params.number ? parseInt(route.params.number.toString(), 10) : undefined)

const { data: cluster, error, status, refresh } = await useAsyncData(
  () => `cluster-${clusterNumber.value}`,
  async () => {
    if (clusterNumber.value === undefined) {
      return null
    }
    return api.clustersRetrieve({ number: clusterNumber.value })
  }
)

useHead({
  title: `Cluster ${clusterNumber.value}`
})

</script>
