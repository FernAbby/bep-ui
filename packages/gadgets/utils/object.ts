import { isArray, isPlainObject, isString, isKey, isEmpty } from './typeof'
import { isDeepProp } from './regexp'

/**
 * @description 获取对象可枚举属性及symbol属性
 */
export function getAllKeys(object: any): (string | symbol)[] {
  return ([] as (string | symbol)[]).concat(
    Object.keys(object),
    Object.getOwnPropertySymbols(object)
  )
}

/**
 * @description 将给定的值转换成一个路径数组
 */
export function castPath(value: string | string[]): string[] {
  if (isArray(value)) {
    return value as string[]
  }
  if (isKey(value)) {
    if (isString(value) && isDeepProp(value as string)) {
      const result: string[] = []
      ;(value as string).replace(
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        function (match, number, offset, subString) {
          result.push(offset ? subString.replace(/\\(\\)?/g, '$1') : number || match)
        } as (match: string, number: string, offset: number, subString: string) => string
      )
    }
    return [value.toString()]
  }
  return []
}

/**
 * @description 剔除object内不想要的属性值
 */
// TODO ====> 完善深度匹配 如.data.list这种结构
export function omit(object: any, paths: string[]) {
  const result: Record<string, any> = {}
  if (!isPlainObject(object) || isEmpty(object)) {
    return result
  }
  // const _paths = castPath(paths)

  Object.keys(object).forEach(function (key) {
    if (!paths.includes(key)) {
      result[key] = object[key]
    }
  })
  return result
}

/**
 * @description 提取object内想要的属性值
 */
// TODO ====> 完善深度匹配
export function pick(object: any, paths: string[]) {
  const result: Record<string, any> = {}
  if (!isPlainObject(object)) {
    return result
  }
  // const _paths = castPath(paths)

  Object.keys(object).forEach(function (key) {
    if (paths.includes(key)) {
      result[key] = object[key]
    }
  })
  return result
}
