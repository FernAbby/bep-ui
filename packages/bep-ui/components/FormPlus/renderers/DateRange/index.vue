<template>
  <el-date-picker
    v-model="model"
    style="width: 240px"
    type="daterange"
    unlinkPanels
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    v-bind="renderOptions"
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
