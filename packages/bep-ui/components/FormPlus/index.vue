<template>
  <el-form :model="formData" :size="size">
    <template v-for="prop in fieldKeys" :key="prop">
      <template v-if="getFormFieldShow(prop)">
        <template v-if="isFormField(prop)">
          <component
            :is="getFormFieldComponent(prop)"
            v-model="formData[prop]"
            :disabled="getFormFieldDisabled(prop)"
            :field="getFormField(prop)"
            :placeholder="getPlaceholder(prop)"
            :custom-context="customContext[prop]"
          />
        </template>
        <template v-else>
          <el-form-item
            v-bind="getFormFieldAttrs(prop)"
            :label="getFormField(prop).title"
            :prop="prop"
            :required="getFormField(prop).required"
          >
            <component
              :is="getFormFieldComponent(prop)"
              v-model="formData[prop]"
              :disabled="getFormFieldDisabled(prop)"
              :field="getFormField(prop)"
              :placeholder="getPlaceholder(prop)"
              :custom-context="customContext[prop]"
            />
          </el-form-item>
        </template>
      </template>
    </template>
  </el-form>
</template>
<script lang="ts" setup>
  import { ElForm, ElFormItem } from 'element-plus'
  import { ref, computed } from 'vue'
  import type { Component } from 'vue'
  import { execStatement, isEmpty, isBoolean } from 'gadget'
  import type { IComponentSize } from '@bep-ui/constants/size'
  import { GLOBAL_CONFIG } from '../../constants'
  import type { ISchema, ISchemaFormItem } from './interface'
  import type { IObjectAny } from '../../types/common'

  defineOptions({ name: 'FormPlus' })

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object as () => IObjectAny,
      default: () => ({})
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    schema: {
      type: Object as () => ISchema,
      default: () => ({
        renderType: 'Object',
        properties: {}
      }),
      required: true
    },
    customContext: {
      type: Object as () => IObjectAny,
      default: () => ({})
    },
    size: {
      type: String as () => IComponentSize,
      default: 'small'
    }
  })

  const formData = ref<IObjectAny>({})
  const fieldKeys = computed(() => Object.keys(props.schema.properties))

  const getFormField = (prop: string): ISchemaFormItem => {
    return props.schema.properties[prop] || {}
  }

  // 是否显示当前项
  const getFormFieldShow = (prop: string) => {
    if (isEmpty((getFormField(prop) as ISchemaFormItem).hidden)) return true
    // console.log(
    //   'execStatement====>',
    //   execStatement({
    //     statement: (getFormField(prop) as ISchemaFormItem).hidden,
    //     rootData: formData.value,
    //     context: props.customContext
    //   })
    // )
    return execStatement({
      statement: (getFormField(prop) as ISchemaFormItem).hidden,
      rootData: formData.value,
      context: props.customContext
    })
  }

  // 是否为formItem
  const isFormField = (prop: string): boolean => {
    if (isBoolean(getFormField(prop)?.isFormField) && getFormField(prop)?.isFormField) return true
    return ['SectionTitle'].includes(getFormField(prop).renderType)
  }

  // 获取渲染组件
  const getFormFieldComponent = (prop: string): Component | undefined => {
    const formField = getFormField(prop)
    if (formField?.renderType === 'Custom') {
      return formField.component
    }
    return GLOBAL_CONFIG.renderers[formField.renderType]
  }

  // 获取属性
  const getFormFieldAttrs = (prop: string) => {
    return getFormField(prop).renderAttrs || {}
  }

  // 此项是否禁用
  const getFormFieldDisabled = (prop: string): boolean => {
    if (props.disabled) return true
    return execStatement({
      statement: (getFormField(prop) as ISchemaFormItem).disabled,
      rootData: formData.value,
      context: props.customContext
    })
  }

  // 获取placeholder
  const getPlaceholder = (prop: string) => {
    const formField = getFormField(prop)
    if (formField.renderOptions?.placeholder) {
      return formField.renderOptions.placeholder
    }
    if (['InputText', 'InputNumber'].includes(formField.renderType)) {
      return `请输入${formField.title}`
    }
    if (/select|cascader|date/.test(formField.renderType.toLowerCase())) {
      return `请选择${formField.title}`
    }
    return formField.title || ''
  }
</script>
<style lang="scss"></style>
