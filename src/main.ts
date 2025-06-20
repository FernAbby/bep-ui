import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@amap/amap-jsapi-types'
// import 'element-plus/dist/index.css'
import '@bep-ui/theme/index.scss'
import './assets/styles/main.css'

import App from './App.vue'
import router from './router'
import directives from '@/directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(directives)

app.mount('#app')
