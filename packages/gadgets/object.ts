import { isArray, isPlainObject, isString, isKey } from './typeof'
import { isDeepProp } from './regexp'

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
 * @description 提取出对象中不包含的字符串
 */
// TODO ====> 完善深度匹配
export function omit(object: any, paths: string | string[]) {
  const result = {}
  if (isPlainObject(object)) {
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
