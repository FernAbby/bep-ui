import { isNumber } from './typeof'

/**
 * @description 金额数字千分位格式化
 * @param value
 */
export function thousandSeparatedFormat(value: any): string {
  if (isNumber(value) && Math.abs(parseFloat(value)) >= 1000) {
    const splits = value.toString().split('.')
    const integerPart = splits[0].replace(/(\d)(?=(?:\d{3})+(?!\S))/g, '$1,')
    if (splits.length > 1) {
      return `${integerPart}.${splits[1]}`
    }
    return integerPart
  }
  return value
}

/**
 * @description limit-size 转为 limitSize 格式
 * @param {string} str
 */
export function snakeToCamel(str: string) {
  const strList = str.split('-')
  return strList
    .map((word, index) => {
      if (index > 0) {
        return word.toUpperCase()
      }
      return word
    })
    .join('')
}

/**
 * @description 对象 limit-size 格式属性 转为 limitSize 格式
 * @param {object} obj
 */
export function propsToCamel(obj: object) {
  Object.keys(obj).forEach((key) => {
    if (/-/.test(key)) {
      obj[snakeToCamel(key)] = obj[key]
    }
    Reflect.deleteProperty(obj, key)
  })
}
