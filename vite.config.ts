import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import { viteGadgetsConfig } from './vite.gadgets.config'
import { viteBepUiConfig } from './vite.bepui.config'

// console.log('import.meta.url=====>', import.meta.url)

// https://vitejs.dev/config/
export default defineConfig(() => {
  if (process.env.LIB_NAME === 'bep-ui') {
    return viteBepUiConfig()
  }
  if (process.env.LIB_NAME === 'gadgets') {
    return viteGadgetsConfig()
  }
  return {
    plugins: [vue(), vueJsx(), VueDevTools()],
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
