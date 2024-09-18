import { isBoolean, isString } from './typeof'
import type { IObjectAny } from '../typings'

/**
 * @description 字符串判断语句执行结果，如：hidden, disabled, required 等
 * @description 非安全方法，慎用
 */
export function execStatement({
  statement,
  rootData,
  context
}: {
  statement: string | boolean | undefined
  rootData: IObjectAny
  context: IObjectAny
}): boolean {
  if (isBoolean(statement)) {
    return statement as unknown as boolean
  }

  if (statement && isString(statement)) {
    try {
      const fn = new Function('$', '$ctx', `return ${statement}`)
      return !!fn(rootData, context)
    } catch (e) {
      console.warn(e)
    }
  }

  return false
}
