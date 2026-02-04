<template>
  <NuxtLink
    v-if="isInternal && !isHash && !isMailTo"
    v-bind="sanitisedAnchorProps"
    data-is-nuxt-link
  >
    <slot />
  </NuxtLink>
  <a
    v-else
    v-bind="sanitisedAnchorProps"
    data-is-hyperlink
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
/**
 * An anchor hyperlink that detects whether to use SPA Nuxt/Vue Router or a conventional hyperlink.
 *
 * If the link is external then target="_blank" and rel="noopener" will be added.
 *
 */
import { computed } from 'vue'
import { NuxtLink } from '#components'
import { EXTERNAL_LINK_REL, TARGET_NEW_WINDOW } from '~/utils/html'
import { isHashLink, isInternalLink, isMailToLink } from '~/utils/url'

const props = defineProps<{ href?: string; id?: string }>()

const isInternal = computed(() => isInternalLink(props.href))
const isMailTo = computed(() => isMailToLink(props.href))
const isHash = computed(() => isHashLink(props.href))

const sanitisedAnchorProps = computed(() => {
  const isNuxtLink =
    props.href && isInternal.value && !isMailTo.value && !isHash.value
  const isExternalLink =
    props.href && !isInternal.value && !isMailTo.value && !isHash.value

  return {
    ...props,
    to: isNuxtLink ? props.href : undefined, // copy `href` to `to` for NuxtLink
    href: isNuxtLink ? undefined : props.href, // clobber 'href' with `undefined` when it's a NuxtLink
    rel: isExternalLink ? EXTERNAL_LINK_REL : undefined,
    target: isExternalLink ? TARGET_NEW_WINDOW : undefined
  }
})
</script>