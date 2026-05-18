<template>
  <tr v-if="isMounted && statusArr.some(status => status === 'pending')">
    <RpcTdMessage :colspan="props.columnCount">
      Loading...
    </RpcTdMessage>
  </tr>
  <tr v-else-if="isMounted && statusArr.every(status => status === 'success') && props.rowCount === 0">
    <RpcTdMessage :colspan="props.columnCount" class="italic">
      None
    </RpcTdMessage>
  </tr>
  <tr v-else-if="isMounted && errorArr.some(error => Boolean(error))">
    <RpcTdMessage :colspan="props.columnCount" class="bg-red-300">
      Error:
      <BaseBadge v-for="error in errorArr" color="red" class="mr-2">
        {{ error }}
      </BaseBadge>
    </RpcTdMessage>
  </tr>
</template>

<script setup lang="ts">
type UseAsyncDataReturn = Awaited<ReturnType<typeof useAsyncData>>
type UseAsyncDataStatus = UseAsyncDataReturn['status']['value']
type UseAsyncDataError = UseAsyncDataReturn['error']['value']

type Props = {
  rowCount: number
  columnCount: number
  status?: UseAsyncDataStatus | UseAsyncDataStatus[]
  error?: UseAsyncDataError | UseAsyncDataError[]
}

const props = defineProps<Props>()

const statusArr = computed(() => {
  const { status } = props
  return status ? Array.isArray(status) ? status : [status] : []
})

const errorArr = computed(() => {
  const { error } = props
  return error ? Array.isArray(error) ? error : [error] : []
})

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
onUnmounted(() => {
  isMounted.value = false
})
</script>
