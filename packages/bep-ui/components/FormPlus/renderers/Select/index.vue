<template>
  <el-select
    v-model="model"
    :placeholder="placeholder"
    clearable
    v-bind="renderOptions"
    :disabled="disabled"
  >
    <el-option
      v-for="item in renderOptions.options || []"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts" setup>
  import { ElSelect, ElOption } from 'element-plus'
  import { computed } from 'vue'
  import { isEmpty } from 'biz-gadgets'
  import { rendererProps } from '../../constants/rendererProps'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', isEmpty(value) ? undefined : value)
    }
  })
  const renderOptions = computed(() => {
    return props.field.renderOptions || {}
  })
</script>
