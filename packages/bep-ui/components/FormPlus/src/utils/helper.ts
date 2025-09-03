import { unref } from 'vue'
import type { IFormPlusSchema, ISchemaFormItem } from '../types'

// 对象类型的 schema 转为 数组型 schema
export function objectToArray(schema: IFormPlusSchema) {
  const results: ISchemaFormItem[] = []
  Object.keys(schema).forEach((prop) => {
    if (schema[prop]) {
      results.push({
        prop: prop,
        ...unref(schema[prop])
      })
    }
  })
  return results
}
