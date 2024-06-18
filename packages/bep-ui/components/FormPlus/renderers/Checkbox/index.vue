<template>
  <el-checkbox-group v-bind="renderOptions" v-model="model" :disabled="disabled">
    <el-checkbox v-for="item in options || []" :key="item.value" v-bind="item" />
  </el-checkbox-group>
</template>
<script lang="ts" setup>
  import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
  import { computed } from 'vue'
  import useUniversalRender from '../../hooks/useUniversalRender'
  import { rendererProps } from '../../constants/rendererProps'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const options = computed(() => props.field.renderOptions?.options || [])

  const { model, renderOptions } = useUniversalRender(props, emits, true)
</script>
