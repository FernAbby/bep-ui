<template>
  <el-cascader
    v-bind="renderOptions"
    v-model="model"
    :placeholder="placeholder"
    clearable
    placement="bottom-start"
    :disabled="disabled"
    :options="options"
  />
</template>
<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import { ElCascader } from 'element-plus'
  import { computed } from 'vue'
  import { isEmpty, omit, isFunction } from 'biz-gadgets'
  import { rendererProps } from '../../constants/rendererProps'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', isEmpty(value) ? undefined : value)
    }
  })
  const options = ref<Record<string, any>[]>([])

  const renderOptions = computed(() => {
    return omit(props.field?.renderOptions || {}, ['options', 'request'])
  })

  watch(
    () => props.field?.renderOptions,
    (value) => {
      if (value?.options) {
        options.value = value.options || []
      }
    },
    {
      deep: true,
      immediate: true
    }
  )

  onMounted(() => {
    const request = props.field?.renderOptions?.request
    if (request && isFunction(request)) {
      request().then((data) => {
        options.value = data
      })
    }
  })
</script>
