import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@amap/amap-jsapi-types'
// import 'element-plus/dist/index.css'
import '@bep-ui/theme/index.scss'
import './assets/styles/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
