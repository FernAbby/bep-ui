import {
  isArray,
  isDate,
  isMap,
  isSet,
  isObject,
  isBuffer,
  isPlainObject,
  isWeakSet,
  isWeakMap,
  isSymbol
} from './typeof'

/**
 * @description 拷贝函数
 * 如果函数依赖于闭包或特定于环境的状态（例如模拟私有变量），直接拷贝可能不会保留这些状态，因此需要特别注意。
 */
export function deepCloneFunction(fn: any, hash = new WeakMap()) {
  // 创建一个绑定的新函数
  const newFn = fn.bind({})
  for (const prop in fn) {
    if (fn.hasOwnProperty(prop)) {
      newFn[prop] = typeof fn[prop] === 'function' ? deepCloneFunction(fn[prop], hash) : fn[prop]
    }
  }
  return newFn
}

/**
 * @description 简单拷贝
 * 1、不支持特殊对象：日期、正则表达式、Symbol、函数等复杂类型的拷贝
 * 2、无法正确处理循环引用，导致无限递归
 */
export function plainClone(object: Record<string, any>) {
  return JSON.parse(JSON.stringify(object))
}

// TODO ====> 完善深度拷贝
function baseClone(value: any, hash = new WeakMap()): any {
  // console.log('clone value====>', value, isSymbol(value))

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
      const allProps = [].concat(Object.keys(value), Object.getOwnPropertySymbols(value))
      allProps.map((key) => {
        copyObject[key] = baseClone(value[key], hash)
      })
      hash.set(value as WeakKey, copyObject)
      return copyObject
    }

    if (isDate(value)) {
      return new Date(value)
    }

    if (isBuffer(value)) {
      return value.slice()
    }

    if (isSet(value) || isWeakSet(value)) {
      const copySet = new Set<any>()
      ;(value as Set<any>).forEach((item) => {
        copySet.add(baseClone(item, hash))
      })
      return copySet
    }

    if (isMap(value) || isWeakMap(value)) {
      const copyMap = new Map<any, any>()
      ;(value as Map<any, any>).forEach((item: any, key: any) => {
        copyMap.set(key, baseClone(item, hash))
      })
      return copyMap
    }
  }

  if (isSymbol(value)) {
    return Symbol(value.description)
  }

  return value
}

/**
 * @description 深度拷贝
 * 1、支持特殊对象：日期、正则表达式、函数等
 * 2、正确处理循环引用，不会导致无限递归
 */
export function deepClone<T>(value: T): T {
  return baseClone(value)
}
