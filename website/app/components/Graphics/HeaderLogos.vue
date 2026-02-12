<template>
  <Anchor
    href="/"
    :class="[props.class, 'pl-0']"
  >
    <img
      :src="LogoMobile"
      class="lg:hidden"
      alt="RFC Editor: Queue - Upcoming RFCs Queue"
      width="196"
      height="24"
    />
    <img
      :src="LogoDesktop"
      class="hidden lg:block"
      alt="RFC Editor: Queue - Upcoming RFCs Queue"
      width="264"
      height="37"
    />
  </Anchor>
</template>

<script setup lang="ts">
import LogoDesktop from 'assets/logo-desktop.svg'
import LogoMobile from 'assets/logo-mobile.svg'
import type { VueStyleClass } from '~/utils/vue'

type Props = {
  class?: VueStyleClass
}

const props = defineProps<Props>()
</script>