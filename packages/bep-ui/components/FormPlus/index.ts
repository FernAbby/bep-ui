import { withInstall } from '@bep-ui/utils/install'
import { default as BepFormPlus } from './src/index.vue'
export * from './src/types'
import { rendererProps, unFormFieldRendererProps } from './src/constants/rendererProps'
import * as injectKeys from './src/constants/injectKeys'

export const FormContext = {
  rendererProps,
  unFormFieldRendererProps,
  injectKeys
}

export const FormPlus = withInstall(BepFormPlus)

// FormPlus.install = (app: App) => {
//   // 组件注册，按需引入
//   app.component('BepFormPlus', FormPlus)
//   return app
// }
export default FormPlus
