import type { App } from 'vue'
import { freezeGlobalConfig, renderResolver } from '@bep-ui/helper'
import { INSTALLED_KEY } from './constants'
import type { IConfigProviderContext } from './constants'

const BepUI = {
  install(app: App, options: IConfigProviderContext = {}) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (app[INSTALLED_KEY]) return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    app[INSTALLED_KEY] = true

    freezeGlobalConfig(options)
    renderResolver(app)
  }
}

export default BepUI