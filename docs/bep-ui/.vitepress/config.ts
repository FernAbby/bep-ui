import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-Hans',
  title: "BepUI",
  description: "基于element-plus开发formPlus、tablePlus组件",
  head: [
    ['link', { rel: 'icon', href: '/public/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "./public/assets/logo.svg",
    siteTitle: 'bep-ui',

    nav: [
      { text: '指导', link: '/' },
      { text: '组件', link: '/components/dashboard' }
    ],

    sidebar: [
      {
        text: '总览', link: '/components/dashboard'
      },
      {
        text: '组件',
        items: [
          { text: 'FormPlus', link: '/components/FormPlus' },
          { text: 'SearchForm', link: '/components/SearchForm' },
          { text: 'TablePlus', link: '/components/TablePlus' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FernAbby/bep-ui' }
    ]
  },
  markdown: {
    // @vitepress-demo-preview的配置
    config(md) {
      // 支持区块内的方式展示 demo 和示例代码
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../../src', import.meta.url)),
        '@packages': fileURLToPath(new URL('../../../packages', import.meta.url)),
        '@bep-ui': fileURLToPath(new URL('../../../packages/bep-ui', import.meta.url)),
        '@gadgets': fileURLToPath(new URL('../../../packages/gadgets', import.meta.url))
      }
    }
  }
})
