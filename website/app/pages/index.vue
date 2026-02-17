<template>
    <div class="min-h-[100vh]">
        <NuxtLayout name="default">
            <div class="mx-auto container text-right py-5">
                <p class="text-sm text-grey-800 pr-3">
                    Looking for published RFCs? Go to
                    <Anchor :href="RFC_EDITOR_SITE_URL_ORIGIN" class="text-blue-300 dark:text-blue-100">
                        {{ RFC_EDITOR_SITE_URL_ORIGIN }}
                    </Anchor>
                </p>
            </div>
            <div class="container mx-auto">
                <Heading
                    level="1"
                    style-level="3"
                    class="w-full mx-2 mb-2 md:mb-3 text-gray-600 font-semibold text-balance"
                >
                    Upcoming RFCs Queue
                </Heading>
                <QueueTable />
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { RFC_EDITOR_SITE_URL_ORIGIN, } from '~/utils/url'

definePageMeta({
    layout: false
})
</script>