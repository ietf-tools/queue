<template>
    <div class="min-h-[100vh]">
        <NuxtLayout name="default">
                 <div class="container mx-auto">
                <Heading level="1" style-level="3"
                    class="w-full mx-2 mt-5 mb-2 md:mb-3 text-gray-600 font-semibold text-balance">
                    Clusters
                </Heading>
                <ClustersTable />
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { RFC_EDITOR_SITE_URL_ORIGIN } from '~/utils/url'

definePageMeta({
    layout: false
})
</script>