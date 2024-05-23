import path from 'path'
import dts from 'vite-plugin-dts'
import { UserConfig } from 'vite'

// 获取构建路径
export function resolveBuildPath(lib: string, suffix?: string) {
  return `packages/${lib}/dist${suffix ? `/${suffix}` : ''}`
}
export const GADGETS_LIB_NAME = 'gadgets'
export function viteGadgetsConfig(): UserConfig {
  return {
    plugins: [
      // vue(),
      dts({
        outDir: resolveBuildPath(GADGETS_LIB_NAME, 'types'),
        include: 'packages/gadgets',
        tsconfigPath: 'packages/gadgets/tsconfig.json'
      })
    ],
    build: {
      outDir: resolveBuildPath(GADGETS_LIB_NAME),
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, './packages/gadgets/index.ts'), // 指定组件编译入口文件
        name: GADGETS_LIB_NAME,
        fileName: GADGETS_LIB_NAME
      },
      rollupOptions: {
        external: ['vue', 'element-plus', 'gadgets'],
        output: [
          {
            dir: resolveBuildPath(GADGETS_LIB_NAME, 'es'),
            entryFileNames: '[name].mjs',
            format: 'es',
            preserveModules: true,
            globals: {
              vue: 'Vue',
              'element-plus': 'elementPlus'
            }
          },
          {
            dir: resolveBuildPath(GADGETS_LIB_NAME, 'umd'),
            name: '[name].umd.cjs',
            format: 'umd',
            globals: {
              vue: 'Vue',
              'element-plus': 'elementPlus'
            }
          }
        ]
      }
    }
  }
}
