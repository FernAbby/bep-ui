<template>
  <div :class="rootClass" v-bind="renderOptions">{{ model || '-' }}</div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'
  import { classnames } from 'biz-gadgets'
  import { GLOBAL_CONFIG } from '@bep-ui/constants'
  import { rendererProps } from '../../constants/rendererProps'
  const props = defineProps(rendererProps)
  const model = computed(() => props.modelValue)
  const rootClass = computed(() => {
    return classnames([
      props.field.renderOptions?.class,
      'description-content',
      `${GLOBAL_CONFIG}-description-content`
    ])
  })
  const renderOptions = computed(() => {
    return props.field.renderOptions || {}
  })
</script>
<style lang="scss" scoped>
  .description-content {
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
</style>
