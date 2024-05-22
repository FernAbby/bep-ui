<template>
  <el-radio-group v-bind="renderOptions" v-model="model">
    <el-radio v-for="item in renderOptions.options || []" :key="item.value" v-bind="item">{{item.label}}</el-radio>
  </el-radio-group>
</template>
<script lang="ts" setup>
  import { ElRadio, ElRadioGroup } from 'element-plus'
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