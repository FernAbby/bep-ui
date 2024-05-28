/**
 * @description 用于生成通用唯一标识符（UUID）的一种方法
 * @description UUIDv4是UUID的一个版本，它基于随机数，保证了全球的唯一性。
 * @description 由32个十六进制数字组成的字符串，通常表现为8-4-4-4-12的形式，例如：550e8400-e29b-41d4-a716-446655440000
 */
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
