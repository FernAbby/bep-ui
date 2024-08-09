import type { Component } from 'vue'
import type { TableProps, TableColumnCtx } from 'element-plus'
import type { PaginationProps } from 'element-plus'
import type { IFormPlusProps } from '@bep-ui/components'

// export type ITableColumnProps = Partial<typeof ElTableColumn>
export type ITableColumnProps = Partial<TableColumnCtx<Record<string, any>>>

export interface ITableColumnScope {
  row: Record<string, any>
  column: ITableColumn
  $index: number
}

export interface ITableColumn {
  title: string
  dataIndex: string
  // render渲染优先级最高，当同时存在其他设置时，优先渲染render函数
  render?: (scope: ITableColumnScope) => Component | string
  // 默认text类型
  renderType?: 'text' | 'slot' | 'selection' | 'index' | 'expand'
  // component渲染优先级次于render
  component?: Component
  componentProps?: (scope: ITableColumnScope) => Record<string, any>
  columnProps?: ITableColumnProps
  columnSetting?: {
    disabled?: boolean // 是否能设置隐藏/显示
    fixed?: boolean // 固定元素排序位置
  }
  hidden?: boolean
}

export interface IPagination {
  currentPage: number
  pageSize: number
  total: number
}

export interface ITableRequestData {
  data: Record<string, any>
  total: number
  currentPage?: number
  pageSize?: number
}

export interface ITablePlusProps extends TableProps<Record<string, any>> {
  pagination?: Partial<IPagination>
  paginationProps?: Partial<PaginationProps>
  formProps?: Partial<IFormPlusProps>
  request?: (
    sp: Record<string, any>,
    pp: IPagination
  ) => Promise<ITableRequestData> | ITableRequestData
  onSearch: ({ sp, pp }: { sp: Record<string, any>; pp: IPagination }) => void
}
