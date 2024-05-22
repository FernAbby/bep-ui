<template>
  <el-input v-model="model" v-bind="renderOptions" :disabled="disabled" :placeholder="placeholder" />
</template>
<script lang="ts" setup>
  import { ElInput } from 'element-plus'
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
<style lang="scss"></style>