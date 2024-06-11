import type { ISchema } from '../FormPlus/interface'
import type { ITableColumn } from './interface'

// 列默认配置
export const defaultColumnProps = {
  'min-width': 80,
  width: 'auto'
}

export const tableProps = {
  schema: {
    type: Object as () => ISchema,
    default: undefined
  },
  columns: {
    type: Array as () => ITableColumn[],
    default: () => []
  },
  dataSource: {
    type: Array as () => Record<string, any>[],
    default: () => []
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
  showIndex: {
    type: Boolean,
    default: false
  }
}
