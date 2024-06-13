import type { ISchemaFormItem } from '@bep-ui/components/FormPlus/interface'
import type { IObjectAny } from '@bep-ui/types/common'
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
