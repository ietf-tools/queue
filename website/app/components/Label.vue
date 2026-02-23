<template>
  <BaseBadge :color="props.label.themeColor">
    <Icon v-if="props.label.isException" class="mr-2" name="pajamas:warning"/>
    {{ props.label.slug }}
  </BaseBadge>
</template>

<script setup lang="ts">
import type { LabelCommon } from '../utils/validators'

type Props = {
  label: LabelCommon
}

const props = defineProps<Props>()
</script>
