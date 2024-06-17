/**
 * @description 生成一个数字数组
 * @param {number} length 数组长度
 * @param {number} start 数组起始数字
 */
export function genNumberArray(length: number, start = 0) {
  return Array.from({ length: length }, (_, i) => start + i)
}
