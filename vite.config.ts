import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'
import { viteGadgetsConfig } from './vite.gadgets.config'

// https://vitejs.dev/config/
export default defineConfig(() => {
  if (process.env.LIB_NAME === 'gadgets') {
    return viteGadgetsConfig()
  }
  return {
    plugins: [
      vue(),
      vueJsx(),
      VueDevTools(),
      // 自动引入 ElementPlus CSS
      // ElementPlus({
      //   useSource: true,
      //   ignoreComponents: ['ElForm']
      // }),
      // 自动导入组件
      AutoImport({
        dts: 'typings/auto-imports.d.ts',
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver({
            // importStyle: 'sass',
            // directives: true
          })
        ]
      }),
      // 自动注册组件
      Components({
        dts: 'typings/components.d.ts',
        resolvers: [
          ElementPlusResolver({
            // importStyle: 'sass', // 不带样式
            // directives: true
          })
        ]
      })
    ],
    // 自定义主题样式
    css: {
      preprocessorOptions: {
        scss: {
          // 使用新版本编译 api
          api: 'modern-compiler',
          additionalData: `@use "@/assets/styles/element-plus/index.scss" as *;`
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@packages': fileURLToPath(new URL('./packages', import.meta.url)),
        '@bep-ui': fileURLToPath(new URL('./packages/bep-ui', import.meta.url)),
        '@gadgets': fileURLToPath(new URL('./packages/gadgets', import.meta.url))
      }
    }
  }
})
