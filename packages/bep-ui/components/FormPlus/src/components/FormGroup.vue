<template>
  <template v-for="item in formFields" :key="item.prop">
    <template v-if="isFormFieldShow(item)">
      <FormItem
        :field="item"
        :prop-path="getPropPath(item.prop)"
        @change="handleChange"
        @enter="handleEnter"
      />
    </template>
  </template>
</template>
<script lang="ts" setup>
  import { execStatement, isEmpty, isArray } from 'biz-gadgets'
  import { computed, inject } from 'vue'
  import {
    IChangeEvent,
    IFormPlusSchema,
    IObjectSchema,
    ISchemaFormItem,
    IArraySchema
  } from '../types'
  import { ROOT_ATTRS_INJECTION_KEY, ROOT_DATA_INJECTION_KEY } from '../constants/injectKeys'
  import FormItem from './FormItem.vue'
  import { objectToArray } from '../utils/helper'

  defineOptions({
    name: 'FormGroup'
  })

  const emits = defineEmits(['change', 'enter'])
  const props = defineProps({
    schema: {
      type: Object as () => IFormPlusSchema,
      default: () => ({
        renderType: 'Object',
        properties: {}
      }),
      required: true
    },
    path: {
      type: String,
      default: ''
    }
  })

  const rootData = inject(ROOT_DATA_INJECTION_KEY) || { value: {} as any }
  const rootAttrs = inject(ROOT_ATTRS_INJECTION_KEY) || { value: {} as any }

  const formFields = computed(() => {
    // 兼容数组格式数据
    if (isArray(props.schema)) {
      return props.schema as IArraySchema
    }
    // 兼容对象类型老的格式
    if ((props.schema as IObjectSchema).renderType === 'Object') {
      return objectToArray((props.schema as IObjectSchema).properties)
    }
    console.log('props.schema ===>', props.schema)
    return objectToArray(props.schema)
  })

  // 是否显示当前项
  const isFormFieldShow = (field: ISchemaFormItem) => {
    if (isEmpty(field.hidden)) return true
    return !execStatement({
      statement: field.hidden,
      rootData: rootData.value,
      context: rootAttrs.value?.customContext
    })
  }

  // 获取属性值路径
  const getPropPath = (prop: string) => {
    return props.path ? `${props.path}.${prop}` : prop
  }

  const handleChange = (e: IChangeEvent) => {
    emits('change', e)
  }

  const handleEnter = (e: IChangeEvent) => {
    emits('enter', e)
  }
</script>
