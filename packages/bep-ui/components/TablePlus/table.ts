import type { ISchema } from '@bep-ui/components/FormPlus/interface'
import type { ITableColumn } from './interface'

// 列默认配置
export const defaultColumnProps = {
  'min-width': 80,
  width: 'auto'
}

export const defaultPaginationProps = {
  pageSizes: [10, 20, 30, 50, 80, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
  small: true,
  background: true
}

export const tableProps = {
  schema: {
    type: Object as () => ISchema['properties'],
    default: undefined
  },
  // 查询表单属性配置
  formProps: {
    type: Object,
    default: () => ({})
  },
  // 是否展示序号列
  showIndex: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array as () => ITableColumn[],
    default: () => []
  },
  request: {
    type: Function,
    default: undefined
  },
  data: {
    type: Array as () => any,
    default: undefined
  },
  setting: {
    type: Object,
    default: () => ({
      settingColumns: true
    })
  },
  selection: {
    type: Object,
    default: undefined
  },
  pagination: {
    type: [Object, Boolean],
    default: undefined
  },
  // 分页器属性配置
  paginationProps: {
    type: Object,
    default: () => ({})
  }
}
