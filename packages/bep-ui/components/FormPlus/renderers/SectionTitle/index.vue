<template>
  <SectionTitle v-bind="renderOptions">{{ field.title }}</SectionTitle>
</template>
<script lang="ts" setup>
  import SectionTitle from '@bep-ui/components/SectionTitle/index.vue'
  import { computed } from 'vue'
  import { unFormFieldRendererProps } from '../../constants/rendererProps'
  const props = defineProps(unFormFieldRendererProps)
  const renderOptions = computed(() => {
    return props.field.renderOptions || {}
  })
</script>
