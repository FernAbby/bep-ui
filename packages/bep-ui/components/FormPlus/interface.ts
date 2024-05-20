import type { Component } from 'vue'
import type { IObjectAny } from '../../types/common'

export interface ISchemaFormItem {
  title: string
  renderType: string | 'Object' | 'Custom'
  renderOptions: IObjectAny
  hidden: boolean | string
  disabled: boolean
  // renderType === 'Custom' 时
  component?: Component
}

export interface ISchema {
  // TODO  ====> 支持Array
  renderType: 'Object',
  properties: {
    [key: string]: ISchemaFormItem
  }
}

export interface ISchemaRenderer {
  [key: string]: Component
}
