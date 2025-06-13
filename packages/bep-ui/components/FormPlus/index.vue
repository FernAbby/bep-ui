<template>
  <div :class="formClasses" :style="rootStyle">
    <el-form ref="formRef" :model="rootData" :size="size" v-bind="attrs" :inline="isLine">
      <FormGroup :schema="schema" @change="handleChange" @enter="handleEnter" />
      <div v-if="$slots.append" :class="ns.b('append')">
        <slot name="append"></slot>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import type { FormInstance } from 'element-plus'
  import { ElForm } from 'element-plus'
  import { ref, computed, watch, useAttrs, provide, toRaw } from 'vue'
  import { classnames, isEmpty, deepClone } from 'biz-gadgets'
  import { useNamespace } from 'biz-gadgets/hooks'
  import type { IComponentSize } from '@bep-ui/constants/size'
  import { GLOBAL_CONFIG } from '@bep-ui/global'
  import type { IObjectAny } from '@bep-ui/types/common'
  import { ROOT_ATTRS_INJECTION_KEY, ROOT_DATA_INJECTION_KEY } from './constants/injectKeys'
  import type { IFormPlusRef, IFormSchema, IChangeEvent, IFormLayout } from './interface'
  import FormGroup from './FormGroup.vue'

  const emits = defineEmits(['change', 'enter'])

  defineOptions({
    name: 'FormPlus',
    inheritAttrs: false
  })
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object as () => IObjectAny,
      default: () => ({})
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    schema: {
      type: Object as () => IFormSchema,
      default: () => ({
        renderType: 'Object',
        properties: {}
      }),
      required: true
    },
    customContext: {
      type: Object as () => IObjectAny,
      default: () => ({})
    },
    size: {
      type: String as () => IComponentSize,
      default: 'default'
    },
    layout: {
      type: String as () => IFormLayout,
      default: 'block'
    },
    rootClass: {
      type: String,
      default: ''
    },
    rootStyle: {
      type: String,
      default: undefined
    },
    separator: {
      type: String,
      default: ''
    }
  })
  const attrs = useAttrs()
  const ns = useNamespace('form-plus', GLOBAL_CONFIG.prefix)

  const formRef = ref<FormInstance>()
  const rootData = ref<IObjectAny>({})

  const fieldKeys = computed(() => Object.keys(props.schema.properties))
  const formClasses = computed(() => {
    return classnames([
      ns.b(),
      ns.m(props.layout),
      ns.m(props.size),
      {
        [ns.m('readonly')]: props.readOnly
      },
      props.rootClass
    ])
  })
  const isLine = computed(() => ['inline'].includes(props.layout))

  watch(
    () => props.model,
    (value) => {
      rootData.value = value
    },
    {
      deep: true,
      immediate: true
    }
  )

  const handleChange = (e: IChangeEvent) => {
    emits('change', {
      ...e,
      data: toRaw(rootData.value)
    })
  }

  const handleEnter = (e: IChangeEvent) => {
    emits('enter', {
      ...e,
      data: toRaw(rootData.value)
    })
  }

  provide(ROOT_DATA_INJECTION_KEY, rootData)
  provide(
    ROOT_ATTRS_INJECTION_KEY,
    computed(() => ({
      customContext: props.customContext,
      disabled: props.disabled,
      size: props.size,
      separator: props.separator
    }))
  )

  defineExpose<IFormPlusRef>({
    getFormData: () => {
      return toRaw(rootData.value)
    },
    setFormData: (data) => {
      if (!isEmpty(data)) {
        Object.keys(data).forEach((key) => {
          rootData.value[key] = deepClone(data[key])
        })
      }
    },
    validate: (callback) => {
      return formRef.value?.validate(callback)
    },
    reset: () => {
      formRef.value?.resetFields(fieldKeys.value)
      return rootData
    },
    scrollToField: (prop: string) => {
      formRef.value?.scrollToField(prop)
    }
  })
</script>
