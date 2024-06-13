import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { UserConfig } from 'vite'

const BEP_LIB_NAME = 'bep-ui'

// 获取构建路径
function resolveBuildPath(lib: string, suffix?: string) {
  return `packages/${lib}/dist${suffix ? `/${suffix}` : ''}`
}

export function viteBepUiConfig(): UserConfig {
  return {
    plugins: [
      vue(),
      dts({
        outDir: resolveBuildPath(BEP_LIB_NAME, 'types'),
        tsconfigPath: path.resolve(__dirname, './tsconfig.bepui.json')
      }),
      vueJsx()
    ],
    build: {
      outDir: resolveBuildPath(BEP_LIB_NAME),
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, './packages/bep-ui/index.ts'), // 指定组件编译入口文件
        name: BEP_LIB_NAME,
        fileName: BEP_LIB_NAME
      },
      rollupOptions: {
        external: ['vue', 'element-plus', 'biz-gadgets'],
        output: [
          {
            dir: resolveBuildPath(BEP_LIB_NAME, 'es'),
            entryFileNames: '[name].mjs',
            format: 'es',
            preserveModules: true,
            globals: {
              vue: 'Vue',
              'element-plus': 'elementPlus',
              'biz-gadgets': 'bizGadgets'
            }
          },
          {
            dir: resolveBuildPath(BEP_LIB_NAME, 'umd'),
            name: '[name].cjs',
            format: 'umd',
            globals: {
              vue: 'Vue',
              'element-plus': 'elementPlus',
              'biz-gadgets': 'bizGadgets'
            }
          }
        ]
      }
    },
    resolve: {
      alias: {
        '@bep-ui': fileURLToPath(new URL('./packages/bep-ui', import.meta.url))
      }
    }
  }
}
