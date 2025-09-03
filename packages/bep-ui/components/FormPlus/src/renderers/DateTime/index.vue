<template>
  <el-date-picker
    style="width: 240px"
    :placeholder="placeholder"
    type="datetime"
    v-bind="renderOptions"
    v-model="model"
    :disabled="disabled"
  />
</template>
<script lang="ts" setup>
  import { ElDatePicker } from 'element-plus'
  import { computed } from 'vue'
  import { rendererProps } from '../../constants/rendererProps'
  defineOptions({
    inheritAttrs: false
  })
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const model = computed({
    get: () => props.modelValue as any,
    set: (value) => {
      emits('update:modelValue', value)
    }
  })
  const renderOptions = computed(() => {
    return (
      props.field.renderOptions || {
        type: 'datetime'
      }
    )
  })
</script>
