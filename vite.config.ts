import { fileURLToPath, URL } from 'node:url'

import path from 'path'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import VueDevTools from 'vite-plugin-vue-devtools'

const BEP_LIB_NAME = 'bep-ui'
const GADGET_LIB_NAME = 'gadget'

// console.log('import.meta.url=====>', import.meta.url)

const bepUIConfig: UserConfig = {
  plugins: [
    vue(),
    dts({
      outDir: 'libs/gadget/bep-ui'
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
      external: ['vue', 'element-plus', 'gadget'],
      output: [
        {
          dir: `libs/${BEP_LIB_NAME}/es`,
          entryFileNames: '[name].es.js',
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

const gadgetConfig: UserConfig = {
  plugins: [
    vue(),
    dts({
      outDir: 'libs/gadget/types'
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './packages/gadget/index.ts'), // 指定组件编译入口文件
      name: GADGET_LIB_NAME,
      fileName: GADGET_LIB_NAME,
    },
    rollupOptions: {
      external: ['vue', 'element-plus', 'gadget'],
      output: [
        {
          dir: `libs/${GADGET_LIB_NAME}/es`,
          entryFileNames: '[name].es.js',
          format: 'es',
          preserveModules: true,
          globals: {
            vue: 'Vue',
            'element-plus': 'elementPlus',
          },
        },
        {
          dir: `libs/${GADGET_LIB_NAME}/umd`,
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
  if (process.env.LIB_NAME === 'gadget') {
    innerConfig = { ...defaultConfig, ...gadgetConfig }
  }
  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@packages': fileURLToPath(new URL('./packages', import.meta.url)),
        '@bep-ui': fileURLToPath(new URL('./packages/bep-ui', import.meta.url)),
        '@gadget': fileURLToPath(new URL('./packages/gadget', import.meta.url))
      }
    },
    ...innerConfig,
  }
})
