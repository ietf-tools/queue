<template>
  <Heading
    v-bind="$attrs"
    level="1"
    class="pt-5 pb-3 px-2"
    :has-internal-link="false"
  >
    <slot />
  </Heading>
</template>

<script setup lang="ts">
</script>
