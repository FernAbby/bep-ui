import { withInstall } from '@bep-ui/utils/install'
import { default as BepFormPlus } from './index.vue'
export * from './interface'

export const FormPlus = withInstall(BepFormPlus)

// FormPlus.install = (app: App) => {
//   // 组件注册，按需引入
//   app.component('BepFormPlus', FormPlus)
//   return app
// }
export default FormPlus
