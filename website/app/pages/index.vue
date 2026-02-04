<template>
    <div class="min-h-[100vh]">
        <NuxtLayout name="default">
            <div class="container mx-auto pr-3">
                <p class="hidden mt-8 mb-4 lg:block text-base text-grey-800 pl-5">
                    Looking for the main site?
                    <Anchor :href="RFC_EDITOR_SITE_URL_ORIGIN" class="text-blue-300 dark:text-blue-100">
                        {{ RFC_EDITOR_SITE_URL_ORIGIN }}
                    </Anchor>
                </p>
            </div>

            <div  class="container mx-auto grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card heading-level="2" has-cover-link href="/">
                    <template #headingTitle>My title</template>
                    sdfsdfsdf
                </Card>
                <Card heading-level="2" has-cover-link href="/">
                    <template #headingTitle>My title2</template>
                    sdfsdfsdf
                </Card>
                <Card heading-level="2" has-cover-link href="/">
                    <template #headingTitle>My title2</template>
                    sdfsdfsdf
                </Card>
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