import { computed } from 'vue'
import { omit, isEmpty } from 'biz-gadgets'
import type { ISchemaFormItem } from '../types'

export interface IRendererProps {
  readonly disabled: boolean
  readonly field: ISchemaFormItem
  readonly modelValue?: any
  readonly placeholder: string
  readonly customContext: Record<string, any>
}

export type IRendererEmits = (event: 'update:modelValue', ...args: any[]) => void

export default function useUniversalRender(
  props: IRendererProps,
  emits: IRendererEmits,
  omitOptions: string[] = []
) {
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', value)
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
