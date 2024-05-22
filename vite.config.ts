import { fileURLToPath, URL } from 'node:url'

import path from 'path'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import VueDevTools from 'vite-plugin-vue-devtools'
// console.log('import.meta.url=====>', import.meta.url)

const BEP_LIB_NAME = 'bep-ui'
const GADGETS_LIB_NAME = 'gadgets'

const bepUIConfig: UserConfig = {
  plugins: [
    vue(),
    dts({
      outDir: 'libs/gadgets/bep-ui'
    }),
    vueJsx(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './packages/bep-ui/index.ts'), // 指定组件编译入口文件
      name: BEP_LIB_NAME,
      fileName: BEP_LIB_NAME,
    },
    rollupOptions: {
      external: ['vue', 'element-plus', 'gadgets'],
      output: [
        {
          dir: `libs/${BEP_LIB_NAME}/es`,
          entryFileNames: '[name].es.mjs',
          format: 'es',
          // sourcemap: true,
          preserveModules: true,
          globals: {
            vue: 'Vue',
            'element-plus': 'elementPlus',
          },
        },
        {
          dir: `libs/${BEP_LIB_NAME}/umd`,
          name: '[name].umd.cjs',
          format: 'umd',
          globals: {
            vue: 'Vue',
            'element-plus': 'elementPlus',
          },
        }
      ]
    },
  },
}

const gadgetsConfig: UserConfig = {
  plugins: [
    vue(),
    dts({
      outDir: 'libs/gadgets/types'
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './packages/gadgets/index.ts'), // 指定组件编译入口文件
      name: GADGETS_LIB_NAME,
      fileName: GADGETS_LIB_NAME,
    },
    rollupOptions: {
      external: ['vue', 'element-plus', 'gadgets'],
      output: [
        {
          dir: `libs/${GADGETS_LIB_NAME}/es`,
          entryFileNames: '[name].es.mjs',
          format: 'es',
          preserveModules: true,
          globals: {
            vue: 'Vue',
            'element-plus': 'elementPlus',
          },
        },
        {
          dir: `libs/${GADGETS_LIB_NAME}/umd`,
          name: '[name].umd.cjs',
          format: 'umd',
          globals: {
            vue: 'Vue',
            'element-plus': 'elementPlus',
          },
        }
      ]
    },
  },
}

const defaultConfig = {
  plugins: [vue(), vueJsx(), VueDevTools()],
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  let innerConfig = defaultConfig
  if (process.env.LIB_NAME === 'bep-ui') {
    innerConfig = { ...defaultConfig, ...bepUIConfig }
  }
  if (process.env.LIB_NAME === 'gadgets') {
    innerConfig = { ...defaultConfig, ...gadgetsConfig }
  }
  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@packages': fileURLToPath(new URL('./packages', import.meta.url)),
        '@bep-ui': fileURLToPath(new URL('./packages/bep-ui', import.meta.url)),
        '@gadgets': fileURLToPath(new URL('./packages/gadgets', import.meta.url))
      }
    },
    ...innerConfig,
  }
})
