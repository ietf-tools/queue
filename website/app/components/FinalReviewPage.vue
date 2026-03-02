<template>
  <div class="container mx-auto my-6">
    <Heading level="1">Final Review for {{ canonicalPath }}</Heading>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const slug = route.path

const normalizedSlug = slug.replace(/^\//, '').replace(/\/$/, '')

const canonicalPath = `/${normalizedSlug}/`

const { error, data, status } = await useAsyncData(canonicalPath, async () => {
  return []
},
  { server: false, lazy: true })

if (status.value === 'success' && data.value === null) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}

if (route.fullPath !== canonicalPath) {
  await navigateTo({
    path: canonicalPath
  })
}
</script>