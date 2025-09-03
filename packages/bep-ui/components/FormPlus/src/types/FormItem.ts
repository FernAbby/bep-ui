import type { FormItemProps } from 'element-plus'
import type { Component } from 'vue'
import { Recordable } from '@bep-ui/types/common'
import { IFormPlusProps } from '@bep-ui/components'

export interface IBaseFormItem {
  prop?: string
  // 表单项标题
  title?: string
  // 渲染类型
  renderType: 'Object' | 'Custom' | string // 是最特殊的
  // FormItem 内部包裹组件渲染属性
  renderOptions?: {
    placeholder?: string | string[]
    options?: Recordable[]
    [key: string]: any
  }
  // element-plus 原生 FormItem 渲染属性
  // 当为嵌套 子表单时 是 IFormPlusProps
  renderAttrs?: Partial<FormItemProps> | IFormPlusProps
  // 是否隐藏 默认 false
  hidden?: boolean | string
  // 是否禁用 默认 false
  disabled?: boolean | string
  // 是否必填项 默认 false
  required?: boolean | string
  // 是否展示 tooltip 提示
  tooltip?: string
  // 是否为表单项，如标题和分割线
  isFixedItem?: boolean
  // searchForm 触发方式 选择时触发搜索
  trigger?: 'select' | 'search'
  // renderType === 'Custom' 时
  component?: Component
  // 嵌套子表单 当 renderType === 'Object' 时
  properties?: Recordable<IBaseFormItem>
}
