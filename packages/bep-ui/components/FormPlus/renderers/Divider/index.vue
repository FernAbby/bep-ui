<template>
  <el-divider v-bind="renderOptions" />
</template>
<script lang="ts" setup>
  import { ElDivider } from 'element-plus'
  import { computed } from 'vue'
  import { unFormFieldRendererProps } from '../../constants/rendererProps'
  const props = defineProps(unFormFieldRendererProps)
  const renderOptions = computed(() => {
    return props.field.renderOptions || {}
  })
</script>
