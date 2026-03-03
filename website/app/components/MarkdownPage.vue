<template>
    <div class="container mx-auto my-6 wrap-anywhere leading-[1.75]">
        <ContentRenderer v-if="page" :value="page" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const slug = route.path

const normalizedSlug = slug.replace(/^\//, '').replace(/\/$/, '')

const markdownPath = `/${normalizedSlug}`

const { error, data: page } = await useAsyncData(markdownPath, () =>
    queryCollection('content').path(markdownPath).first()
)

if (error.value || page.value === null) {
    throw createError({
        statusCode: 404,
        statusMessage: `Not Found`,
        fatal: true
    })
}

const canonicalPath = `/${normalizedSlug}/`

if (route.fullPath !== canonicalPath) {
    await navigateTo({
        path: canonicalPath
    })
}
</script>