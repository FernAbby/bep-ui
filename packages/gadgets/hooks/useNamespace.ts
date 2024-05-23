import { isFunction } from '../typeof'

// useGetDerivedNamespace
export let defaultNamespace = ''
export let defaultCssNamespace = 'root'
const statePrefix = 'is-'

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace ? `${namespace}-` : ''}${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}
/**
 * @description 格式化命名class
 * @param {String} block - 模块
 * @param {String} namespaceOverrides - 命名空间
 * @returns {Object} - 包含 b: 模块， e: 元素， m: 修饰 等 的对象
 */
export function useNamespace(block: string, namespaceOverrides?: string) {
  const namespace = namespaceOverrides || defaultNamespace
  const cssNamespace = namespaceOverrides || defaultCssNamespace
  // const namespace = useGetDerivedNamespace(namespaceOverrides)

  const set = (namespaceOverrides: string) => {
    defaultNamespace = namespaceOverrides
    defaultCssNamespace = namespaceOverrides
  }
  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '')
  const e = (element?: string) => (element ? _bem(namespace, block, '', element, '') : '')
  const m = (modifier?: string) => (modifier ? _bem(namespace, block, '', '', modifier) : '')

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : ''
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  const bm = (blockSuffix?: string, modifier?: string) => {
    return blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : ''
  }
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier ? _bem(namespace, block, blockSuffix, element, modifier) : ''

  const is = (name: string, state: boolean | undefined | (() => boolean)) => {
    if (!name || !state) return ''
    let isState = true
    if (isFunction(state)) {
      isState = (state as () => boolean)()
    }
    return isState ? `${statePrefix}${name}` : ''
  }

  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${cssNamespace}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${cssNamespace}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string) => `--${cssNamespace}-${name}`
  const cssVarBlockName = (name: string) => `--${cssNamespace}-${block}-${name}`

  return {
    set,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    cssVar,
    cssVarBlock,
    cssVarName,
    cssVarBlockName
  }
}
