<template>
  <el-select
    v-model="model"
    multiple
    filterable
    remote
    reserve-keyword
    clearable
    remote-show-suffix
    v-bind="renderOptions"
    :placeholder="placeholder"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script lang="ts" setup>
  import { ElSelect, ElOption } from 'element-plus'
  import { isPromise, isEmpty } from 'biz-gadgets'
  import { computed, ref } from 'vue'
  import { rendererProps } from '../../constants/rendererProps'
  import type { IOption } from '../../interface'
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', isEmpty(value) ? undefined : value)
    }
  })

  const loading = ref(false)
  const options = ref<IOption[]>([])

  // 远程搜索
  const remoteMethod = (query: string) => {
    if (props.field.renderOptions?.remoteMethod) {
      const res = props.field.renderOptions.remoteMethod(query)
      if (isPromise(res)) {
        loading.value = true
        res
          .then((res: IOption[]) => {
            options.value = res
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        options.value = res
      }
      return
    }
    options.value = []
  }

  const renderOptions = computed(() => {
    return props.field.renderOptions || {}
  })
</script>
