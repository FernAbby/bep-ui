<template>
  <el-date-picker
    v-model="model"
    style="width: 240px"
    :placeholder="placeholder"
    v-bind="renderOptions"
    type="date"
    :disabled="disabled"
  />
</template>
<script lang="ts" setup>
  import { ElDatePicker } from 'element-plus'
  import { computed } from 'vue'
  import { rendererProps } from '../../constants/rendererProps'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', value)
    }
  })
  const renderOptions = computed(() => {
    return props.field.renderOptions || {}
  })
</script>