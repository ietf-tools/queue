<template>
  <i v-if="status === 'pending'">
    Loading...
  </i>
  <div v-else-if="status === 'error'">
    {{ error }}
  </div>
  <div v-else-if="status === 'success' && clusterPackage">
    <Heading level="1" style-level="3"
      class="w-full mx-2 mb-2 md:mb-3 text-gray-600 dark:text-gray-200 font-semibold text-balance">
      Cluster {{ props.clusterNumber }}
    </Heading>
    <QueueIndexTable :filter-by-cluster-number="props.clusterNumber" :show-final-approval-counts="true"
      :show-clusters="false" class="mt-3" />
    <DocumentDependenciesGraph :cluster="clusterPackage.cluster" />
    <p v-if="generatedAt" class="text-sm italic text-gray-600 dark:text-gray-400">
      Last updated
      <TimeStamp :dateTime="generatedAt" />
    </p>
  </div>
  <div v-else>
    <!-- 404 or unknown state -->
    Unknown cluster
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

type Props = {
  clusterNumber: number
}

const props = defineProps<Props>()

const origin = usePublicSiteUrlOrigin()

const { data: clusterPackage, error, status } = await useAsyncData(
  () => `cluster-${props.clusterNumber}`,
  () => getClusterPackage(origin, props.clusterNumber),
  {
    server: true, // rendering on the server to generate real 404s for missing content
    lazy: true,
  }
)

if (status.value === 'error' || status.value === 'success' && clusterPackage === undefined) {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
}

const generatedAt = computed(() => clusterPackage.value?.timestampIso ? DateTime.fromISO(clusterPackage.value.timestampIso) : undefined)
</script>
