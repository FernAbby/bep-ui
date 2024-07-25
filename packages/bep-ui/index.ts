import type { App } from 'vue'
import { freezeGlobalConfig, renderResolver } from './utils/helper'
import { INSTALLED_KEY } from './global'
import type { IConfigProviderContext } from './global'
import './theme/index.scss'

export * from './components/FormPlus/index'
export * from './components/SearchForm/index'
export * from './components/TablePlus/index'
export * from './components/SectionTitle/index'

interface IApp extends App {
  [key: symbol]: boolean
}

const BepUI = {
  install(app: App, options: Partial<IConfigProviderContext> = {}) {
    if ((app as IApp)[INSTALLED_KEY]) return
    ;(app as IApp)[INSTALLED_KEY] = true

    freezeGlobalConfig(options)
    renderResolver(app)
  }
}

// 不注册全局组件组件，只安装FormPlus的renderer
export function installRenderer(options: Partial<IConfigProviderContext>) {
  freezeGlobalConfig(options)
}

export default BepUI
