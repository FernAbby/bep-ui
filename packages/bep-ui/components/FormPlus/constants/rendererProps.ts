import type { ISchemaFormItem } from '@bep-ui/components'
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
