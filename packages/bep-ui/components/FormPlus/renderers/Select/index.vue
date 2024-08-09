<template>
  <el-select
    :placeholder="placeholder"
    clearable
    filterable
    placement="bottom-start"
    v-bind="renderOptions"
    v-model="model"
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
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', isEmpty(value) ? undefined : value)
    }
  })
  const options = computed(() => {
    return props.field?.renderOptions?.options || []
  })

  const renderOptions = computed(() => {
    return omit(props.field?.renderOptions || {}, ['options'])
  })
</script>
