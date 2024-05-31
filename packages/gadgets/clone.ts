import {
  isArray,
  isMap,
  isSet,
  isObject,
  isPlainObject,
  isFunction,
  isAsyncFunction
} from './typeof'

/**
 * @description 简单拷贝
 * 1、不支持特殊对象：日期、正则表达式、函数等
 * 2、无法正确处理循环引用，导致无限递归
 */
export function plainClone(object: Record<string, any>) {
  return JSON.parse(JSON.stringify(object))
}

// TODO ====> 完善深度拷贝
function baseClone(value: any, hash = new WeakMap()): any {
  console.log('value====>', value)

  if (isObject(value)) {
    if (hash && hash.get(value as WeakKey)) {
      return hash.get(value as WeakKey)
    }

    if (isArray(value)) {
      const copyArray = (value as any[]).map((item) => baseClone(item, hash))
      hash.set(value as WeakKey, copyArray)
      return copyArray
    }

    if (isPlainObject(value)) {
      const copyObject = {}
      Object.keys(value).map((key) => {
        copyObject[key] = baseClone(value[key])
      })
      hash.set(value as WeakKey, copyObject)
      return copyObject
    }

    if (isMap(value)) {
      const copyMap = new Map<any, any>()
      ;(value as Map<any, any>).forEach((item: any, key: any) => {
        copyMap.set(key, baseClone(item, hash))
      })
      hash.set(value as WeakKey, copyMap)
      return copyMap
    }

    if (isSet(value)) {
      const copySet = new Set<any>()
      ;(value as Set<any>).forEach((item) => {
        copySet.add(baseClone(item, hash))
      })
    }
  }

  return value
}

/**
 * @description 深度拷贝
 * 1、支持特殊对象：日期、正则表达式、函数等
 * 2、正确处理循环引用，不会导致无限递归
 */
export function deepClone<T>(value: T): T {
  if (isObject(value) || isFunction(value) || isAsyncFunction(value)) {
    return baseClone(value)
  }
  return value
}
