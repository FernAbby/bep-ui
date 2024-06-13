// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import {
  AntDesignContainer,
  // ElementPlusContainer,
  // NaiveUIContainer
} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import ElementPlus from 'element-plus'
import BepUI from 'bep-ui'
import 'element-plus/dist/index.css';
// import 'bep-ui/dist/es/style.css';
import '@/assets/base.css'
import '@/assets/main.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
    app.use(BepUI)
    app.component('demo-preview', AntDesignContainer)
    // ...
  }
} satisfies Theme
