<template>
    <div class="min-h-[100vh]">
        <NuxtLayout name="default">
            <template #subheader>
                <IndexSubheader />
            </template>

            <div class="mx-auto container text-right mt-2">
                <p class="text-sm md:text-base text-grey-800 pr-3">
                    Looking for published RFCs? Go to
                    <Anchor :href="RFC_EDITOR_SITE_URL_ORIGIN" class="text-blue-300 dark:text-blue-100">
                        {{ RFC_EDITOR_SITE_URL_ORIGIN }}
                    </Anchor>
                </p>
            </div>

            <div class="container mx-auto">
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