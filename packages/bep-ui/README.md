# BepUI

## 安装

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install bep-ui --save

# Yarn
$ yarn add bep-ui

# pnpm
$ pnpm install bep-ui
```

## 使用

bep-ui是基于vue3 + element-plus,所以在使用bep-ui时，请先安装element-plus组件库

```json
{
  "peerDependencies": {
    "biz-gadgets": "^1.0.5",
    "element-plus": ">=2.7.3",
    "vue": ">=3.4.0"
  }
}
```

安装完成后，在main.ts文件引入样式文件

```typescript
import 'bep-ui/dist/es/style.css'
```

### 完整引入

```typescript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import bepUI from 'bep-ui'
import 'bep-ui/dist/es/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(bepUI, {
  size: 'small',
  renderers: {
    // 自定义组件渲染器
    // 键值为组件名 组件
    SingleSelect: Component
  }
})
app.mount('#app')
```

### 按需导入

您需要使用额外的插件来导入要使用的组件
在用到的页面直接引入

```typescript
import { bepFormPlus } from 'bep-ui'
```
