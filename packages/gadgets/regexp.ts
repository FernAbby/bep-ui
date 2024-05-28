/**
 * @description 是否只由中文组成的字符串
 */
export function isChinese(value: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(value)
  // return /[\u4e00-\u9fa5]/.test(value)
}

/**
 * @description 是否由字母数字组成的字符串
 */
export function isAlphanumeric(value: string): boolean {
  return /^[a-z\d]+$/i.test(value)
}

/**
 * @description 是否为手机号码
 */
export function isMobile(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}
