<template>
  <template v-for="item in formFields" :key="item._key">
    <template v-if="isFormFieldShow(item)">
      <FormItem :field="item" :prop-path="getPropPath(item._key)" />
    </template>
  </template>
</template>
<script lang="ts" setup>
  import { execStatement, isEmpty } from 'biz-gadgets'
  import { computed, toRaw, inject } from 'vue'
  import { IFormSchema, IInnerSchemaFormItem } from './interface'
  import { ROOT_ATTRS_INJECTION_KEY, ROOT_DATA_INJECTION_KEY } from './constants/injectKeys'
  import FormItem from './FormItem.vue'

  defineOptions({
    name: 'FormGroup'
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emits = defineEmits(['change'])
  const props = defineProps({
    schema: {
      type: Object as () => IFormSchema,
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
  const rootData = inject(ROOT_DATA_INJECTION_KEY)
  const rootAttrs = inject(ROOT_ATTRS_INJECTION_KEY)

  const formFields = computed(() => {
    const results: IInnerSchemaFormItem[] = []
    Object.keys(props.schema.properties).forEach((prop) => {
      if (props.schema.properties[prop]) {
        results.push({
          _key: prop,
          ...toRaw(props.schema.properties[prop])
        })
      }
    })
    return results
  })

  // 是否显示当前项
  const isFormFieldShow = (field: IInnerSchemaFormItem) => {
    if (isEmpty(field.hidden)) return true
    // console.log(
    //   'show execStatement====>',
    //   execStatement({
    //     statement: field.hidden,
    //     rootData: rootData.value,
    //     context: props.customContext
    //   })
    // )
    return !execStatement({
      statement: field.hidden,
      rootData: rootData.value,
      context: rootAttrs.value.customContext
    })
  }

  // 获取属性值路径
  const getPropPath = (prop: string) => {
    return props.path ? `${props.path}.${prop}` : prop
  }
</script>
