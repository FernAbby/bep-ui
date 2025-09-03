import type { Recordable } from '@bep-ui/types/common'
import type { IFormLayout, IFormPlusSchema } from '@bep-ui/components'
import type { IComponentSize } from '@bep-ui/constants/size'
import { PropType } from 'vue'

const formPlusProps = {
  size: {
    type: String as () => IComponentSize,
    default: 'default'
  },
  layout: {
    type: String as () => IFormLayout,
    default: 'block'
  },
  schema: {
    type: Object as () => IFormPlusSchema,
    default: () => ({
      renderType: 'Object',
      properties: {}
    }),
    required: true
  },
  model: {
    type: Object as () => Recordable,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  customContext: {
    type: Object as PropType<Recordable>,
    default: () => ({})
  },
  rootClass: {
    type: String,
    default: ''
  },
  rootStyle: {
    type: String,
    default: undefined
  }
}

export default formPlusProps
