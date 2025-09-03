<template>
  <el-input-number
    :placeholder="placeholder"
    v-bind="renderOptions"
    v-model="model"
    :disabled="disabled"
  />
</template>
<script lang="ts" setup>
  import { ElInputNumber } from 'element-plus'
  import { computed } from 'vue'
  import { rendererProps } from '../../constants/rendererProps'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', value);
    }
  })
  const renderOptions = computed(() => {
    return props.field.renderOptions || {}
  })
</script>
