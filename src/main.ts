import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@amap/amap-jsapi-types'
// import 'element-plus/dist/index.css'
// import './assets/styles/element-plus/index.scss'
import '@bep-ui/theme/index.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
