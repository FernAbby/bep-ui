import type { Component } from 'vue'
import type { FormItemProps, FormValidateCallback, FormValidationResult } from 'element-plus'
import type { IObjectAny } from '../../types/common'
import FormPlus from './index.vue'

export type IFormLayout = 'grid' | 'flex' | 'block'

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
  title?: string
  renderType: string | 'Object' | 'Array' | 'Custom'
  // FormItem 内部组件渲染属性
  renderOptions?: IObjectAny
  // FormItem 渲染属性
  renderAttrs?: FormItemProps
  hidden?: boolean | string
  disabled?: boolean | string
  required?: boolean | string
  isFixedItem?: boolean // 是否为表单项，如标题和分割线
  // renderType === 'Custom' 时
  component?: Component
}

export interface IBaseSchema {
  [key: string]: ISchemaFormItem
}

export interface IFormSchema {
  renderType: 'Object' | 'Array'
  properties: IBaseSchema
  renderAttrs?: {
    layout?: IFormLayout
  }
}

export type IInnerSchemaFormItem = ISchemaFormItem &
  IFormSchema & {
    _key?: string
  }

export interface IChangeEvent {
  key: string
  value: Record<string, []> | Record<string, []>[]
  origin: any
}

// 表单属性
export type IFormPlusProps = InstanceType<typeof FormPlus>['$props']
