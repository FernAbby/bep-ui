<template>
  <template v-if="isFormItem">
    <el-form-item
      v-bind="field.renderAttrs"
      :label="field.title"
      :label-width="!field.title ? '0px' : undefined"
      :prop="propPath"
      :required="required"
    >
      <template v-if="field.tooltip" #label>
        <span>{{ field.title }}</span>
        <el-tooltip class="box-item" effect="dark" :content="field.tooltip">
          <el-icon size="14"><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <div v-if="isGroup" :class="subItemsClass">
        <FormGroup :schema="field as IFormSchema" :path="propPath" />
      </div>
      <template v-else>
        <component
          :is="component"
          :key="propPath"
          v-model="data"
          :prop="propPath"
          :disabled="disabled"
          :field="field"
          :placeholder="placeholder"
          :custom-context="rootAttrs.customContext"
          @change="handleChange"
          @keyup.enter="handleEnter"
        />
      </template>
    </el-form-item>
  </template>
  <template v-else>
    <div :class="fixedFormFieldClass">
      <component :is="component" :disabled="disabled" :field="field" />
    </div>
  </template>
</template>
<script lang="ts" setup>
  import { computed, inject, watch } from 'vue'
  import { execStatement, deepClone } from 'biz-gadgets'
  import { ElFormItem, ElIcon, ElTooltip } from 'element-plus'
  import { QuestionFilled } from '@element-plus/icons-vue'
  import { getValue, setValue } from './utils'
  import {
    getFormFieldComponent,
    getPlaceholder,
    isFormItemGroup,
    isFormField,
    ns
  } from './utils/render'
  import type { IFormSchema, IInnerSchemaFormItem } from './interface'
  import { ROOT_ATTRS_INJECTION_KEY, ROOT_DATA_INJECTION_KEY } from './constants/injectKeys'
  import FormGroup from './FormGroup.vue'

  defineOptions({
    name: 'FormItem',
    inheritAttrs: false
  })

  const emits = defineEmits(['change', 'enter'])
  const props = defineProps({
    propPath: {
      type: String,
      default: ''
    },
    field: {
      type: Object as () => IInnerSchemaFormItem,
      default: () => ({})
    }
  })
  let oldValue: any
  const rootData = inject(ROOT_DATA_INJECTION_KEY)
  const rootAttrs = inject(ROOT_ATTRS_INJECTION_KEY)

  const data = computed({
    get: () => getValue(rootData.value, props.propPath),
    set: (value) => {
      oldValue = getValue(rootData.value, props.propPath)
      setValue(rootData.value, props.propPath, value)
    }
  })

  const fixedFormFieldClass = ns.e('fixed-item')
  const subItemsClass = computed(() => {
    return ns.e('sub-group')
  })

  // 是否为FormItem
  const isFormItem = computed(() => {
    return isFormField(props.field)
  })

  const isGroup = computed(() => {
    return isFormItemGroup(props.field)
  })

  // 获取渲染组件
  const component = computed(() => {
    return getFormFieldComponent(props.field)
  })

  // 此项是否禁用
  const required = computed(() => {
    return execStatement({
      statement: props.field.required,
      rootData: rootData.value,
      context: rootAttrs.value.customContext
    })
  })

  // 此项是否禁用
  const disabled = computed(() => {
    if (rootAttrs.value.disabled) return true
    return execStatement({
      statement: props.field.disabled,
      rootData: rootData.value,
      context: rootAttrs.value.customContext
    })
  })

  const placeholder = computed(() => {
    return getPlaceholder(props.field)
  })

  // change 事件
  const handleChange = (...args) => {
    emits('change', {
      key: props.field._key,
      path: props.propPath.split('.'),
      value: data.value,
      preValue: oldValue,
      originEvent: args,
      field: deepClone(props.field)
    })
  }

  const handleEnter = (...args) => {
    console.log('args --->', args)
    emits('enter', {
      key: props.field._key,
      path: props.propPath.split('.'),
      value: data.value,
      preValue: oldValue,
      originEvent: args,
      field: deepClone(props.field)
    })
  }

  watch(
    () => data.value,
    (value) => {
      if (oldValue !== value) {
        // TODO 删除调试代码
        // console.log(
        //   'field ====>',
        //   props.field._key,
        //   props.field.title,
        //   'diff ====>',
        //   oldValue,
        //   value
        // )
        emits('change', {
          key: props.field._key,
          path: props.propPath.split('.'),
          value: data.value,
          preValue: oldValue,
          originEvent: [value],
          field: deepClone(props.field)
        })
      }
    },
    {
      immediate: true,
      deep: true
    }
  )
</script>
