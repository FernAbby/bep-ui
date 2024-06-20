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
  return /^[a-zA-Z0-9]+$/i.test(value)
}

/**
 * @description 是否为手机号码
 */
export function isMobile(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * @description 是否为深度读取的属性 user.name 或 user['name']
 */
export function isDeepProp(value: string): boolean {
  return /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/.test(value)
}

/**
 * @description 是否为邮箱地址
 */
export function isEmail(value: string): boolean {
  return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(
    value
  )
}

export const regexps = {
  Phone: /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9]|9[8-9])\d{8}$/, // 电话号码(移动/联通/电信)

  ImageUrl: /^http[s]*:\/\/|\.jpg$|\.png$|\.jpeg$|\.gif$|\.bmp$|\.webp$|^data:image/, // 图片链接

  IDCard: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/, // 身份证

  Score: /^(\d(\.\d{1,2})?|10(\.0{1,2})?)$/, // 0-10保留两位小数

  Money: /^(([1-9]\d*)|0)(\.\d{1,2})?$/, // 金额数,小数点后保留2位

  MoneyTenThousand: /^(([1-9]\d*)|0)(\.\d{1,6})?$/, // 金额数以万为单位,小数点后保留6位

  Split: /(?=(?!\b)(\d{3})+$)/, // 每三位以逗号分割 str.replace(re,',')

  Email:
    /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,

  Integer: /^-?[1-9]\d*$/, // 整数

  PositiveInteger: /^[1-9]\d*$/, // 正整数

  NegativeInteger: /^-[1-9]\d*$/, // 负整数

  NonPositiveInteger: /^-[1-9]\d*|0$/, // 非正整数

  NonNegativeInteger: /^[1-9]\d*|0$/ // 非负整数
}
