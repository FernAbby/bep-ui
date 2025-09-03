import type { Recordable } from '@bep-ui/types/common'
import { PropType } from 'vue'
import { ISchemaFormItem } from '../types'

export const rendererProps = {
  field: {
    type: Object as PropType<ISchemaFormItem>,
    default: () => ({}),
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
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
    type: Object as PropType<Recordable>,
    default: () => ({})
  }
}

// 非 form-item 的渲染属性
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
