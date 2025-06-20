import type { App } from 'vue'
import { vLoading } from 'element-plus'

export default {
  install: function (app: App) {
    app.directive('loading', vLoading)
  }
}
