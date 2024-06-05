<template>
  <el-date-picker
    v-model="model"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    style="width: 240px; flex-grow: 0"
    v-bind="renderOptions"
    type="datetimerange"
    :disabled="disabled"
  />
</template>
<script lang="ts" setup>
  import { ElDatePicker } from 'element-plus'
  import { computed } from 'vue'
  import { omit } from 'biz-gadgets'
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
    return omit(props.field.renderOptions || {}, ['type'])
  })
</script>
