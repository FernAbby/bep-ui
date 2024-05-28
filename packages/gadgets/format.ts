import { isNumber } from './typeof'

/**
 * @description 金额数字千分位格式化
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
