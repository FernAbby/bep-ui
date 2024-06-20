import { isNumber } from 'biz-gadgets'

/**
 * @description 根据路径获取数据值
 */
export function getValue(data: Record<string, any> | Record<string, any>[], path: string): any {
  const keys = path.split('.')
  if (!keys.length) return undefined
  if (keys.length === 1) return data[path]
  let value = data
  keys.forEach((key, index) => {
    if (!value.hasOwnProperty(key)) {
      if (index === keys.length - 1) {
        value[key] = undefined
      } else {
        value[key] = isNumber(key) ? [] : {}
      }
    } else {
      value = value[key]
    }
  })
  return value
}

/**
 * @description 根据路径设置值
 */
export function setValue(
  data: Record<string, any> | Record<string, any>[],
  path: string,
  val: any
): any {
  const keys = path.split('.')
  if (!keys.length) return
  if (keys.length === 1) {
    data[path] = val
  }
  let pData = data
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (pData.hasOwnProperty(key)) {
      pData = pData[key] // 继续查找下一级属性
    }
  }
  pData[keys[keys.length - 1]] = val
}
