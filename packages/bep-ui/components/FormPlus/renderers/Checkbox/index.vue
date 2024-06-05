<template>
  <el-checkbox-group v-bind="renderOptions" v-model="model" :disabled="disabled">
    <el-checkbox v-for="item in options || []" :key="item.value" v-bind="item" />
  </el-checkbox-group>
</template>
<script lang="ts" setup>
  import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
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
  const options = computed(() => props.field.renderOptions?.options || [])
  const renderOptions = computed(() => {
    return omit(props.field.renderOptions, ['options'])
  })
</script>
