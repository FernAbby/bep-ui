import type { Component } from 'vue'
import renderers from './components/FormPlus/renderers'

export const INSTALLED_KEY = Symbol('BEP_INSTALLED_KEY')

export interface ISchemaRenderer {
  [key: string]: Component
}

export interface IObjectAny {
  [key: string | number]: any
}

export interface IConfigProviderContext {
  prefix: string
  size: string
  // TODO 补充 ISchemaRenderer 类型
  renderers: ISchemaRenderer
  [key: string]: any
}

// export type IConfigProviderContextKey = keyof IConfigProviderContext
export const GLOBAL_CONFIG: IConfigProviderContext = {
  prefix: 'bep',
  size: 'small',
  renderers: renderers
}
