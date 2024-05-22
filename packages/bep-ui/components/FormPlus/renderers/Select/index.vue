<template>
  <el-select
    v-model="model"
    :placeholder="placeholder"
    v-bind="renderOptions"
    :disabled="disabled"
    style="width: 230px"
  >
    <el-option
      v-for="item in (renderOptions.options || [])"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts" setup>
  import { ElSelect, ElOption } from 'element-plus'
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