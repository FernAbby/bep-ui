/**
 * @description 数据转为string类型
 */
export function toTypeString(value: any): string {
  return Object.prototype.toString.call(value)
}

/**
 * @description 判断数据是否为Map类型
 */
export function isMap(value: any): boolean {
  return toTypeString(value) === '[object Map]'
}

/**
 * @description 判断数据是否为Set类型
 */
export function isSet(value: any): boolean {
  return toTypeString(value) === '[object Set]'
}

/**
 * @description 判断数据是否为Date类型
 */
export function isDate(value: any): boolean {
  return toTypeString(value) === '[object Date]'
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
 * @description 判断数据是否为对象
 */
export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object'
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
  return (!value && value !== 0) ||
    (isArray(value) && value.length === 0) ||
    (isObject(value) && !Object.keys(value).length)
}

