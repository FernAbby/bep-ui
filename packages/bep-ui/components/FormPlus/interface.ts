import type { Component } from 'vue'
import type { FormItemProps, FormValidateCallback, FormValidationResult } from 'element-plus'
import type { IObjectAny } from '@bep-ui/types/common'
import FormPlus from './index.vue'

export interface IOption {
  label: string
  value: string
  disabled?: boolean
  key?: string
}

export interface IFormPlusRef {
  getFormData: () => Record<string, any>
  validate: (callback: FormValidateCallback | undefined) => FormValidationResult | undefined
  reset: () => IObjectAny
  scrollToField: (prop: string) => void
}

export interface ISchemaFormItem {
  title: string
  renderType: string | 'Object' | 'Custom'
  // FormItem 内部组件渲染属性
  renderOptions?: IObjectAny
  // FormItem 渲染属性
  renderAttrs?: FormItemProps
  hidden?: boolean | string
  disabled?: boolean
  required?: boolean
  isFormField?: boolean
  // renderType === 'Custom' 时
  component?: Component
}

export interface ISchema {
  // TODO  ====> 支持Array
  renderType: 'Object'
  properties: {
    [key: string]: ISchemaFormItem
  }
}

export interface ISchemaRenderer {
  [key: string]: Component
}

// 表单属性
export type IFormPlusProps = InstanceType<typeof FormPlus>['$props']
