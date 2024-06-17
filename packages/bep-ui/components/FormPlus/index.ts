import { withInstall } from '@bep-ui/utils/install'
import FormPlus from './index.vue'
export * from './interface'

export const BepFormPlus = withInstall(FormPlus)

// FormPlus.install = (app: App) => {
//   // 组件注册，按需引入
//   app.component('BepFormPlus', FormPlus)
//   return app
// }
export default BepFormPlus
