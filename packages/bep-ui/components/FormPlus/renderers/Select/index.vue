<template>
  <el-select
    v-bind="renderOptions"
    v-model="model"
    :placeholder="placeholder"
    clearable
    filterable
    placement="bottom-start"
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
  import { computed, onMounted, ref, watch } from 'vue'
  import { isEmpty, isFunction, omit } from 'biz-gadgets'
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
