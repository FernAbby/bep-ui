<template>
  <el-checkbox-group v-model="model">
    <el-checkbox v-for="item in renderOptions.options || []" :key="item.value" v-bind="item" />
  </el-checkbox-group>
</template>
<script lang="ts" setup>
  import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
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