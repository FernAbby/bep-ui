/**
 * @description 数据转为string类型
 */
export function toTypeString(value: any): string {
  return Object.prototype.toString.call(value)
}

/**
 * @description 数据转为string类型
 */
export function typeOf(value: any): string {
  return toTypeString(value).match(/\s+(\w+)/)![1]
}

/**
 * @description 判断数据是否为Map类型
 */
export function isMap(value: any): boolean {
  return toTypeString(value) === '[object Map]'
}

/**
 * @description 判断数据是否为WeakMap类型
 */
export function isWeakMap(value: any): boolean {
  return toTypeString(value) === '[object WeakMap]'
}

/**
 * @description 判断数据是否为Set类型
 */
export function isSet(value: any): boolean {
  return toTypeString(value) === '[object Set]'
}
/**
 * @description 判断数据是否为WeakSet类型
 */
export function isWeakSet(value: any): boolean {
  return toTypeString(value) === '[object WeakSet]'
}

/**
 * @description 判断数据是否为Date类型
 */
export function isDate(value: any): boolean {
  return toTypeString(value) === '[object Date]'
}

/**
 * @description 判断数据是否为数值，或者是否能转换为数值
 */
export function isNumber(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * @description 判断数据是否为布尔值类型
 */
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean'
}

/**
 * @description 判断数据是否为字符串类型
 */
export function isString(value: any): boolean {
  return typeof value === 'string'
}

/**
 * @description 判断数据是否为函数
 */
export function isFunction(value: any): boolean {
  return typeof value === 'function'
}

/**
 * @description 判断数据是否为异步函数
 */
export function isAsyncFunction(value: any): boolean {
  return toTypeString(value) === '[object AsyncFunction]'
}

/**
 * @description 判断数据是否为Symbol类型
 */
export function isSymbol(value: any): boolean {
  return typeof value === 'symbol'
}

/**
 * @description 判断数据是否为数组
 */
export function isArray(value: any): boolean {
  return Array.isArray(value)
}

/**
 * @description 判断数据是否为对象，包括Object、Array、Map、Set、Date、RegExp等对象
 */
export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object'
}

/**
 * @description 判断数据是否为一个"纯粹"对象
 */
export function isPlainObject(value: any): boolean {
  return toTypeString(value) === '[object Object]'
}

/**
 * @description 判断数据是否为Promise对象
 */
export function isPromise(value: any): boolean {
  return isObject(value) && isFunction(value.then) && isFunction(value.catch)
}

/**
 * @description 判断数据是否空
 */
export function isEmpty(value: any): boolean {
  return (
    (!value && value !== 0) ||
    (isArray(value) && value.length === 0) ||
    (isObject(value) && !Object.keys(value).length)
  )
}

/**
 * @description 判断是否可以作为object的键值，理论上null于undefined可以，但不推荐，判定为无效键值
 */
export function isKey(key: any): boolean {
  const type = typeof key
  return type === 'string' || type === 'boolean' || type === 'symbol' || type === 'number'
}

/**
 * @description 判断是否为ArrayBuffer类型
 */
export function isBuffer(value: any): boolean {
  return toTypeString(value) === '[object ArrayBuffer]'
}
