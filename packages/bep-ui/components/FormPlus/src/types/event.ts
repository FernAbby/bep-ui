import { ISchemaFormItem } from './FormItem'

export interface IChangeEvent {
  key: string
  path: string[]
  value: any
  preValue: any
  origin: any
  field: ISchemaFormItem
}
