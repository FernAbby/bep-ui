import type { App } from 'vue'
import { isEmpty } from '@gadget/typeof'
import type { IConfigProviderContext } from './constants'
import { GLOBAL_CONFIG } from './constants'

// 冻结初始对象
export function freezeGlobalConfig(config: IConfigProviderContext) {
  if (!isEmpty(config.renderers)) {
    GLOBAL_CONFIG.renderers = Object.assign(GLOBAL_CONFIG.renderers, config.renderers)
  }
  Object.keys(config).forEach((key) => {
     if (!['renderers'].includes(key)) {
       GLOBAL_CONFIG[key] = config[key]
     }
  })
  Object.freeze(GLOBAL_CONFIG)
}

export function renderResolver(app: App) {
  Object.keys(GLOBAL_CONFIG.renderers).forEach((key) => {
    app.component(
      `${GLOBAL_CONFIG.prefix}${key || GLOBAL_CONFIG.renderers[key].name}`,
      GLOBAL_CONFIG.renderers[key]
    )
  })
}