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
  import { ref, computed, watch, useAttrs, provide, toRaw, onMounted } from 'vue'
  import { classnames, isEmpty, deepClone } from 'biz-gadgets'
  import { useNamespace } from 'biz-gadgets/hooks'
  import { GLOBAL_CONFIG } from '@bep-ui/global'
  import type { Recordable } from '@bep-ui/types/common'
  import { ROOT_ATTRS_INJECTION_KEY, ROOT_DATA_INJECTION_KEY } from './constants/injectKeys'
  import type { IFormPlusRef, IChangeEvent } from './types'
  import FormGroup from './components/FormGroup.vue'
  import formPlusProps from './props'

  const emits = defineEmits(['register', 'change', 'enter'])

  defineOptions({
    name: 'FormPlus',
    inheritAttrs: false
  })

  const props = defineProps(formPlusProps)
  const attrs = useAttrs()
  const ns = useNamespace('form-plus', GLOBAL_CONFIG.prefix)

  const formRef = ref<FormInstance>()
  const rootData = ref<Recordable>({})

  const fieldKeys = computed(() => Object.keys(props.schema))

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
    }))
  )

  const formPlusRef: IFormPlusRef = {
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
      return rootData.value
    },
    scrollToField: (prop: string) => {
      formRef.value?.scrollToField(prop)
    }
  }

  defineExpose<IFormPlusRef>(formPlusRef)

  onMounted(() => {
    emits('register', formPlusRef)
  })
</script>
