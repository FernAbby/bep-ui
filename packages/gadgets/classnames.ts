import { isString, isArray, isPlainObject } from './typeof'
type IClassName = string | Record<string, boolean | undefined | null> | IClassName[]

/**
 * @description 拼接class
 */
function classnames(...args: IClassName[]): string {
  const classes: string[] = []
  args.forEach((arg) => {
    if (arg) {
      classes.push(parseValue(arg))
    }
  })
  return classes.filter((item) => item).join(' ')
}

function parseValue(arg: IClassName): string {
  if (isString(arg)) {
    return arg as string
  }
  if (isArray(arg)) {
    return classnames(...(arg as IClassName[]))
  }
  if (isPlainObject(arg)) {
    const classes: string[] = []
    Object.keys(arg).forEach((key) => {
      if (key && (arg as Record<string, boolean>)[key]) {
        classes.push(key)
      }
    })
    return classes.join(' ')
  }
  return ''
}

export default classnames
