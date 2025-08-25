/**
 * @description 获取数据类型，任何类型数据必然返回一个数字
 * @param num
 * @param {number} defaultZero
 */
export function getNumber(num: number | string | null | undefined, defaultZero = 0): number {
  if (typeof num === 'number') return num
  if (num && typeof num === 'string') {
    return parseFloat(num)
  }
  return defaultZero
}
