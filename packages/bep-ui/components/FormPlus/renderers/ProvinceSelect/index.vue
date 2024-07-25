<template>
  <el-select
    clearable
    v-model="model"
    v-bind="renderOptions"
    :placeholder="placeholder"
    :disabled="disabled"
  >
    <el-option
      v-for="item in options || []"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts" setup>
  import { ElSelect, ElOption } from 'element-plus'
  import { computed } from 'vue'
  import { isEmpty, omit } from 'biz-gadgets'
  import { rendererProps } from '../../constants/rendererProps'
  import provinces from './provinces'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', isEmpty(value) ? undefined : value)
    }
  })
  const options = computed(() => {
    return props.field?.renderOptions?.options || provinces
  })

  const renderOptions = computed(() => {
    return omit(props.field?.renderOptions || {}, ['options'])
  })
</script>
