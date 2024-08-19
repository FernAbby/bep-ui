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
  getFormData: () => IObjectAny
  setFormData: (data: IObjectAny) => void
  validate: (callback: FormValidateCallback | undefined) => FormValidationResult | undefined
  reset: () => IObjectAny
  scrollToField: (prop: string) => void
}

export interface ISchemaFormItem {
  title?: string
  renderType: string | 'Object' | 'Array' | 'Custom'
  // FormItem 内部组件渲染属性
  renderOptions?: {
    options: IOption[]
  } & any
  // FormItem 渲染属性
  renderAttrs?: Partial<FormItemProps>
  hidden?: boolean | string
  disabled?: boolean | string
  required?: boolean | string
  isFixedItem?: boolean // 是否为表单项，如标题和分割线
  // renderType === 'Custom' 时
  component?: Component
  // searchForm 触发方式 选择时触发搜索
  trigger?: 'select' | 'search'
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
  path: string[]
  value: any
  preValue: any
  origin: any
  field: ISchemaFormItem
}

// 表单属性
export type IFormPlusProps = InstanceType<typeof FormPlus>['$props']
