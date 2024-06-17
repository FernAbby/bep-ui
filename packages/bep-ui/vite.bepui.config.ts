import path from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

const BEP_LIB_NAME = 'bep-ui'

// 获取构建路径
function resolveBuildPath(lib: string, suffix?: string) {
  return `packages/${lib}/dist${suffix ? `/${suffix}` : ''}`
}

function resolve(_path) {
  return path.resolve(__dirname, _path)
}

export default defineConfig(() => {
  return {
    root: './packages/bep-ui',
    plugins: [
      vue(),
      dts({
        outDir: './dist/types',
        tsconfigPath: resolve('./tsconfig.json')
      }),
      vueJsx()
    ],
    tsconfig: resolve('./tsconfig.json'),
    build: {
      outDir: resolve('./dist'),
      sourcemap: true,
      lib: {
        entry: './index.ts', // 指定组件编译入口文件
        name: BEP_LIB_NAME,
        fileName: BEP_LIB_NAME
      },
      rollupOptions: {
        external: [
          'vue',
          'element-plus',
          '@element-plus/icons-vue',
          'biz-gadgets',
          'biz-gadgets/hooks'
        ],
        output: [
          {
            dir: resolve('./dist/es'),
            entryFileNames: '[name].mjs',
            format: 'es',
            preserveModules: true,
            globals: {
              vue: 'Vue',
              'element-plus': 'elementPlus',
              'biz-gadgets': 'bizGadgets',
              'biz-gadgets/hooks': 'bizGadgetsHooks'
            }
          },
          {
            dir: resolveBuildPath(BEP_LIB_NAME, 'umd'),
            name: '[name].cjs',
            format: 'umd',
            globals: {
              vue: 'Vue',
              'element-plus': 'elementPlus',
              'biz-gadgets': 'bizGadgets',
              'biz-gadgets/hooks': 'bizGadgetsHooks'
            }
          }
        ]
      }
    },
    resolve: {
      alias: {
        '@bep-ui': ''
      }
    }
  }
})
