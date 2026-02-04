<template>
  <footer class="bg-blue-900 text-white dark:bg-blue-950 relative print:hidden">
    <div class="container mx-auto flex flex-col md:flex-row py-4 lg:py-8 gap-4">
      <div class="flex-1 flex flex-col gap-5 pr-4">
        <p class="text-base pl-3">
          queue.rfc-editor.org is maintained by the
          <Anchor
            :href="IETF_URL_ORIGIN"
            class="underline text-blue-100 font-semibold md:text-nowrap"
          >
            Internet Engineering Task Force
          </Anchor>
        </p>
        <div class="flex gap-7 items-center mt-2 pl-3 lg:mt-5">
          <Anchor :href="IETF_URL_ORIGIN">
            <GraphicsIETFLogo
              width="105"
              height="60"
            />
          </Anchor>
        </div>
      </div>
      <div class="flex-1 flex flex-col lg:flex-row gap-10 p-3 lg:p-0">
       
      </div>
    </div>
    <ScrollToTop />
  </footer>
</template>

<script setup lang="ts">
import { IETF_URL_ORIGIN } from '../utils/url'
</script>