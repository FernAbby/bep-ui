import { ComponentResolver } from 'unplugin-vue-components'

const component_map: { [key: string]: string } = {
  // 'Abutton': 'Button',
  FormPlus: 'FormPlus',
  TablePlus: 'TablePlus',
  SearchForm: 'SearchForm',
  SectionTitle: 'SectionTitle'
}

const path = `bep-ui/dist/es`

// 按需导入需求 unplugin-vue-components/vite
export default {
  type: 'component',
  resolve: (name: string) => {
    return {
      // Button
      name: component_map[name],
      // ant-design-vue/es
      from: path
      // ant-design-vue/es/button/style/css
      // sideEffects: `ant-design-vue/es/${name.toLowerCase()}/style/css`,
    }
  }
} as ComponentResolver
