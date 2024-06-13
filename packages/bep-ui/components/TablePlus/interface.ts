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
  renderType?: 'text' | 'slot' | 'custom' | 'selection' | 'index' | 'expand'
  component?: Component // type = custom时设置
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
