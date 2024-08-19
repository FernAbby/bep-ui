<template>
  <el-checkbox-group v-bind="renderOptions" v-model="model" :disabled="disabled">
    <el-checkbox v-for="item in options || []" :key="item.value" v-bind="item" />
  </el-checkbox-group>
</template>
<script lang="ts" setup>
  import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
  import { computed } from 'vue'
  import { rendererProps } from '../../constants/rendererProps'
  import checkboxRender from './checkboxRender'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const options = computed(() => props.field.renderOptions?.options || [])

  const { model, renderOptions } = checkboxRender(props, emits, ['options', 'sameRadio'])
</script>
