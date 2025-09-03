<template>
  <div class="input-range">
    <el-input-number
      v-bind="renderOptions"
      v-model="model.min"
      :placeholder="placeholders[0]"
      :min="0"
      :max="model.max"
      :disabled="disabled"
      :controls="false"
    />
    <span class="input-range-separator">~</span>
    <el-input-number
      v-bind="renderOptions"
      v-model="model.max"
      :placeholder="placeholders[1]"
      :min="model.min || 0"
      :controls="false"
      :disabled="disabled"
    />
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'
  import { omit } from 'biz-gadgets'
  import { ElInputNumber } from 'element-plus'
  import { rendererProps } from '../../constants/rendererProps'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    ...rendererProps,
    modelValue: {
      type: Object,
      default: () => ({
        min: undefined,
        max: undefined
      })
    }
  })
  const model = computed({
    get: () => {
      console.log('props.modelValue ===>', props.modelValue)
      if (!props.modelValue) {
        return { min: undefined, max: undefined }
      }
      return props.modelValue
    },
    set: (value) => {
      console.log('value ====>', value)
      emits('update:modelValue', value)
    }
  })
  const placeholders = computed(() => {
    return props.field.renderOptions?.placeholders || ['最小', '最大']
  })
  const renderOptions = computed(() => {
    if (!props.field.renderOptions) {
      return {}
    }
    return omit(props.field.renderOptions, ['placeholders'])
  })
</script>
<style lang="scss" scoped>
  .input-range {
    display: flex;

    .input-range-separator {
      display: inline-block;
      margin: 0 3px;
    }
  }
</style>
