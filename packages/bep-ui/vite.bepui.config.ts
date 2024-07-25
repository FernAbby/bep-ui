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

function resolve(_path: string) {
  return path.resolve(__dirname, _path)
}

export default defineConfig({
  root: './packages/bep-ui',
  plugins: [
    vue(),
    dts({
      outDir: './dist/types',
      tsconfigPath: resolve('./tsconfig.json')
    }),
    vueJsx()
  ],
  // 自定义主题样式
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@bep-ui/theme/element-plus/var.scss" as *;`
      }
    }
  },
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
            'biz-gadgets/hooks': 'bizGadgetsHooks',
            '@element-plus/icons-vue': 'elementPlusIconsVue'
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
            'biz-gadgets/hooks': 'bizGadgetsHooks',
            '@element-plus/icons-vue': 'elementPlusIconsVue'
          }
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@bep-ui': ''
    }
  },
  // @ts-expect-error 配置路径错误提示，后续调整
  tsconfig: resolve('./tsconfig.json')
})
