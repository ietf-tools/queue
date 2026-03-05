<template>
  <FinalReviewPage v-if="draftName" :draft-name="draftName" />
  <span v-else>
    <!-- 404 -->
  </span>
</template>
<script setup lang="ts">
const route = useRoute()

const draftName = computed(() => route.params.id?.toString())

if (!draftName) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}
</script>