import { withInstall } from '@bep-ui/utils/install'
import { default as BepFormPlus } from './index.vue'
export * from './interface'
import { rendererProps, unFormFieldRendererProps } from './constants/rendererProps'
import * as injectKeys from './constants/injectKeys'

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
