<template>
  <div :class="formClasses" :style="rootStyle">
    <el-form ref="formRef" :model="rootData" :size="size" v-bind="attrs">
      <template v-for="prop in fieldKeys" :key="prop">
        <template v-if="getFormFieldShow(prop)">
          <template v-if="isFormField(prop)">
            <el-form-item
              v-bind="getFormFieldAttrs(prop)"
              :label="`${getFormField(prop).title}${separator}`"
              :prop="prop"
              :required="getFormField(prop).required"
            >
              <component
                :is="getFormFieldComponent(prop)"
                v-model="rootData[prop]"
                :disabled="getFormFieldDisabled(prop)"
                :field="getFormField(prop)"
                :placeholder="getPlaceholder(prop)"
                :custom-context="customContext[prop]"
              />
            </el-form-item>
          </template>
          <template v-else>
            <div :class="fixedFormFieldClass">
              <component
                :is="getFormFieldComponent(prop)"
                :disabled="getFormFieldDisabled(prop)"
                :field="getFormField(prop)"
              />
            </div>
          </template>
        </template>
      </template>
      <div :class="ns.b('append')">
        <slot name="append"></slot>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import type { FormInstance } from 'element-plus'
  import { ElForm, ElFormItem } from 'element-plus'
  import { ref, computed, watch, useAttrs, provide, toRaw } from 'vue'
  import type { Component } from 'vue'
  import { execStatement, isEmpty, isBoolean, classnames } from 'biz-gadgets'
  import { useNamespace } from 'biz-gadgets/hooks'
  import type { IComponentSize } from '../../constants/size'
  import { GLOBAL_CONFIG } from '../../global'
  import { ROOT_DATA_INJECTION_KEY } from './constants/injectKeys'
  import type { IFormPlusRef, ISchema, ISchemaFormItem } from './interface'
  import type { IObjectAny } from '../../types/common'

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
      type: Object as () => ISchema,
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
      type: String as () => 'grid' | 'flex' | 'block',
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
  const fixedFormFieldClass = ns.e('fixed-item')

  watch(
    () => props.model,
    (value) => {
      // console.log('model====>', value)
      rootData.value = value
    },
    {
      deep: true,
      immediate: true,
      onTrigger(e) {
        console.log('onTrigger e===>', e)
      }
    }
  )

  const getFormField = (prop: string): ISchemaFormItem => {
    return (
      props.schema.properties[prop] || {
        title: '属性值错误!',
        renderType: 'Description'
      }
    )
  }

  // 是否显示当前项
  const getFormFieldShow = (prop: string) => {
    if (isEmpty((getFormField(prop) as ISchemaFormItem).hidden)) return true
    // console.log(
    //   'execStatement====>',
    //   execStatement({
    //     statement: (getFormField(prop) as ISchemaFormItem).hidden,
    //     rootData: formData.value,
    //     context: props.customContext
    //   })
    // )
    return execStatement({
      statement: (getFormField(prop) as ISchemaFormItem).hidden,
      rootData: rootData.value,
      context: props.customContext
    })
  }

  // 是否为formItem
  const isFormField = (prop: string): boolean => {
    const formField = getFormField(prop)
    if (isBoolean(formField?.isFormField) && formField?.isFormField) return true
    return !['SectionTitle', 'Divider'].includes(formField.renderType)
  }

  // 获取渲染组件
  const getFormFieldComponent = (prop: string): Component | undefined => {
    const formField = getFormField(prop)
    if (formField?.renderType === 'Custom') {
      return formField.component
    }
    return GLOBAL_CONFIG.renderers[formField.renderType]
  }

  // 获取属性
  const getFormFieldAttrs = (prop: string) => {
    return getFormField(prop).renderAttrs || {}
  }

  // 此项是否禁用
  const getFormFieldDisabled = (prop: string): boolean => {
    if (props.disabled) return true
    return execStatement({
      statement: (getFormField(prop) as ISchemaFormItem).disabled,
      rootData: rootData.value,
      context: props.customContext
    })
  }

  // 获取placeholder
  const getPlaceholder = (prop: string) => {
    const formField = getFormField(prop)
    if (formField.renderOptions?.placeholder) {
      return formField.renderOptions.placeholder
    }
    if (['InputText', 'InputNumber'].includes(formField.renderType)) {
      return `请输入${formField.title}`
    }
    if (/select|cascader|date/.test(formField.renderType.toLowerCase())) {
      return `请选择${formField.title}`
    }
    return formField.title || ''
  }

  provide(ROOT_DATA_INJECTION_KEY, rootData)

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
  .bep-form-plus--grid {
    .el-form {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  // TODO ===> 优化动画效果
  //.list-enter-active,
  //.list-leave-active {
  //  transition: all 0.1s linear;
  //}
  //.list-enter-from,
  //.list-leave-to {
  //  opacity: 0;
  //  transform: translateX(30px);
  //}
</style>
