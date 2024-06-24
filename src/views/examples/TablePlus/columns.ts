import type { ITableColumn } from '@bep-ui/components'

export const columns: ITableColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    columnProps: {
      width: 100
    }
  },
  {
    title: '性别',
    dataIndex: 'sex'
  },
  {
    title: '联系方式',
    dataIndex: 'mobile'
  },
  {
    title: '班级',
    dataIndex: 'class'
  },
  {
    title: '地址',
    dataIndex: 'address'
  }
]
