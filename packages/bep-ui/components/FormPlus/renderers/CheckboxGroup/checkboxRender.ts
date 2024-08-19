import { computed } from 'vue'
import { omit, isEmpty } from 'biz-gadgets'
import type { ISchemaFormItem } from '../../interface'

export interface IRendererProps {
  readonly disabled: boolean
  readonly field: ISchemaFormItem
  readonly modelValue?: any
  readonly placeholder: string
  readonly customContext: Record<string, any>
}

export type IRendererEmits = (event: 'update:modelValue', ...args: any[]) => void

export default function checkboxRender(
  props: IRendererProps,
  emits: IRendererEmits,
  omitOptions: string[] = []
) {
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      if (props.field.renderOptions?.sameRadio) {
        emits('update:modelValue', value?.length ? value.slice(-1) : value)
      } else {
        emits('update:modelValue', value)
      }
    }
  })

  const renderOptions = computed(() => {
    if (isEmpty(props.field.renderOptions)) {
      return {}
    }
    if (omitOptions.length) {
      return omit(props.field.renderOptions, omitOptions)
    }
    return props.field.renderOptions
  })

  return {
    props,
    model,
    renderOptions
  }
}
