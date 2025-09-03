import type { FormValidateCallback, FormValidationResult } from 'element-plus'
import type { Recordable } from '@bep-ui/types/common'
import type { IComponentSize } from '@bep-ui/constants/size'
import { IBaseFormItem } from './FormItem'

export type IFormLayout = 'grid' | 'inline' | 'block'

export interface IFormPlusRef {
  getFormData: () => Recordable
  setFormData: (data: Recordable) => void
  validate: (callback?: FormValidateCallback) => FormValidationResult | undefined
  reset: () => Recordable
  scrollToField: (prop: string) => void
}

// 表单 schema 单项 属性
export type ISchemaFormItem = IBaseFormItem

// 对象类型 schema 兼容老的格式
export interface IObjectSchema {
  renderType: 'Object'
  properties: ISchemaFormItem[]
}

// 数组类型的 schema
export type IArraySchema = ISchemaFormItem[]

// 对象类型的数据
export type IBaseSchema = Recordable<ISchemaFormItem>

// 表单 schema 属性
export type IFormPlusSchema = IBaseSchema | IArraySchema | IObjectSchema

// // 表单属性类型
// export type IFormPlusProps = InstanceType<typeof FormPlus>['$props']

// 表单属性
export interface IFormPlusProps {
  schema: IFormPlusSchema
  labelWidth?: string | number
  model?: Recordable
  size?: IComponentSize
  layout?: IFormLayout
  disabled?: boolean
  readOnly?: boolean
  customContext?: Recordable
  rootClass?: string
  rootStyle?: string
  separator?: string
}
