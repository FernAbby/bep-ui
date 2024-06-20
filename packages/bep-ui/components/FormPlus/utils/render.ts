import { IInnerSchemaFormItem } from '@bep-ui/components'
import type { Component } from 'vue'
import { GLOBAL_CONFIG } from '@bep-ui/global'
import { isBoolean } from 'biz-gadgets'
import { useNamespace } from 'biz-gadgets/hooks'

export const ns = useNamespace('form-plus', GLOBAL_CONFIG.prefix)

/**
 * @description 是否是表单项
 */
export function isFormField(field: IInnerSchemaFormItem): boolean {
  if (isBoolean(field.isFixedItem) && field.isFixedItem) return true
  return !['SectionTitle', 'Divider'].includes(field.renderType)
}

/**
 * @description 获取渲染组件
 */
export function getFormFieldComponent(field: IInnerSchemaFormItem): Component {
  if (field.renderType === 'Custom') {
    if (field.component) {
      console.error(`TypeError: ${field.title}component不存在!`)
      return GLOBAL_CONFIG.renderers['Description']
    }
    return field.component
  }
  if (GLOBAL_CONFIG.renderers[field.renderType]) {
    return GLOBAL_CONFIG.renderers[field.renderType]
  }
  // throw new TypeError(`renderType ${formField.renderType}不存在`)
  console.error(`TypeError: ${field.title}renderType为${field.renderType} 渲染器不存在!`)
  return GLOBAL_CONFIG.renderers['Description']
}

/**
 * @description 判断当前项是否为表单组
 */
export function isFormItemGroup(field: IInnerSchemaFormItem): boolean {
  return ['Object', 'Array'].includes(field.renderType)
}

/**
 * @description 设置placeholder
 */
export function getPlaceholder(field: IInnerSchemaFormItem) {
  if (field.renderOptions?.placeholder) {
    return field.renderOptions.placeholder
  }
  if (['InputText', 'InputNumber'].includes(field.renderType)) {
    return `请输入${field.title}`
  }
  if (/select|cascader|date/.test(field.renderType.toLowerCase())) {
    return `请选择${field.title}`
  }
  return field.title || ''
}

/**
 * @description 获取formItem展示标题
 */
export function getFormLabel(field: IInnerSchemaFormItem, separator: string) {
  return `${field.title || ''}${separator || ''}`
}
