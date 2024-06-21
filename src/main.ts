import './assets/main.css'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@amap/amap-jsapi-types'
import 'element-plus/dist/index.css'
import '@bep-ui/theme/index.scss'

import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
