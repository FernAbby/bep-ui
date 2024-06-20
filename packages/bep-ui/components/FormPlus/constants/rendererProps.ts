import type { IObjectAny } from '@bep-ui/types/common'
import type { ISchemaFormItem } from '../interface'
export const rendererProps = {
  disabled: {
    type: Boolean,
    default: false
  },
  field: {
    type: Object as () => ISchemaFormItem,
    default: () => ({})
  },
  modelValue: {
    type: null,
    default: undefined
  },
  placeholder: {
    type: String,
    default: ''
  },
  customContext: {
    type: Object as () => IObjectAny,
    default: () => ({})
  }
}

// 非form-item的渲染属性
export const unFormFieldRendererProps = {
  disabled: {
    type: Boolean,
    default: false
  },
  field: {
    type: Object as () => ISchemaFormItem,
    default: () => ({})
  }
}
