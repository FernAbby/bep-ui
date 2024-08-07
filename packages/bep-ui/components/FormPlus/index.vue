<template>
  <div :class="formClasses" :style="rootStyle">
    <el-form ref="formRef" :model="rootData" :size="size" v-bind="attrs">
      <FormGroup :schema="schema" @change="handleChange" />
      <div :class="ns.b('append')">
        <slot name="append"></slot>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import type { FormInstance } from 'element-plus'
  import { ElForm } from 'element-plus'
  import { ref, computed, watch, useAttrs, provide, toRaw } from 'vue'
  import { classnames } from 'biz-gadgets'
  import { useNamespace } from 'biz-gadgets/hooks'
  import type { IComponentSize } from '../../constants/size'
  import { GLOBAL_CONFIG } from '../../global'
  import { ROOT_ATTRS_INJECTION_KEY, ROOT_DATA_INJECTION_KEY } from './constants/injectKeys'
  import type { IFormPlusRef, IFormSchema, IChangeEvent, IFormLayout } from './interface'
  import type { IObjectAny } from '../../types/common'
  import FormGroup from './FormGroup.vue'

  const emits = defineEmits(['change'])

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
      default: 'small'
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

  watch(
    () => rootData.value,
    () => {
      // console.log('rootData====>', value)
    },
    {
      deep: true,
      immediate: true,
      onTrigger(e) {
        emits('change', e)
      }
    }
  )

  const handleChange = (e: IChangeEvent) => {
    emits('change', e)
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
    getFormData: () => toRaw(rootData.value),
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
<style lang="scss">
  .bep-form-plus {
    .el-form {
      .bep-form-plus__sub-group {
        width: 100%;
        flex: 1;
        flex-wrap: wrap;
        min-width: 0;

        .el-form-item:last-child {
          margin-bottom: 0;
        }
      }

      .el-input-number.is-without-controls .el-input__inner {
        text-align: left;
      }
    }
  }

  // 表单 栅格布局
  .bep-form-plus--grid {
    .el-form {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      grid-column-gap: 12px;
      justify-content: space-evenly;
      align-content: center;
    }

    .el-form-item {
      align-items: flex-start;
    }

    .bep-form-plus__fixed-item {
      grid-column: 1/-1;
    }

    .bep-form-plus-append {
      grid-column-start: -2;
    }
  }
</style>
