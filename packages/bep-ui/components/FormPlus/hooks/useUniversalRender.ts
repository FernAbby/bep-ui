import { computed } from 'vue'
import { omit, isEmpty } from 'biz-gadgets'

export default function useUniversalRender(props, emits, omitOptions = false) {
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emits('update:modelValue', value)
    }
  })
  const renderOptions = computed(() => {
    if (isEmpty(props.field?.renderOptions)) {
      return {}
    }
    if (omitOptions) {
      return omit(props.field.renderOptions, ['options'])
    }
    return props.field.renderOptions
  })

  return {
    props,
    model,
    renderOptions
  }
}
