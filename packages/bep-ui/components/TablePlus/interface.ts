import type { Component } from 'vue'
import { ElTableColumn } from 'element-plus/es/components/table'

export type ITableColumnProps = Partial<typeof ElTableColumn>

export interface ITableColumnScope {
  row: Record<string, any>
  column: ITableColumn
  $index: number
}

export interface ITableColumn {
  title: string
  dataIndex: string
  renderType: 'text' | 'slot' | 'custom'
  component?: Component // type = custom时设置
  componentProps?: (scope: ITableColumnScope) => Record<string, any>
  columnProps?: ITableColumnProps
  columnSetting?: {
    disabled?: boolean // 是否能设置隐藏/显示
    fixed?: boolean // 固定元素排序位置
  }
  hidden?: boolean
}
