import type { App } from 'vue'
import FormPlus from './index.vue'
export * from './interface'

FormPlus.install = (app: App) => {
  // 组件注册，按需引入
  app.component('BepFormPlus', FormPlus)
  return app
}
export default FormPlus
