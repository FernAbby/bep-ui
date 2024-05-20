<template>
  <el-form :model="formData">
    <template v-for="prop in fieldKeys" :key="prop">
      <template v-if="getFormFieldShow(prop)">
        <el-form-item :label="getFormField(prop).title">
          <component
            :is="getFormFieldComponent(prop)"
            v-model="formData[prop]"
            :disabled="disabled"
            :field="getFormField(prop)"
            :placeholder="getPlaceholder(prop)"
          />
        </el-form-item>
      </template>
    </template>
  </el-form>
</template>
<script lang="ts" setup>
  import { defineProps, ref, computed } from 'vue'
  import type { Component } from 'vue'
  import { execStatement } from '@gadget/statement'
  import { GLOBAL_CONFIG } from '../../constants'
  import type { ISchema, ISchemaFormItem } from './interface'
  import type { IObjectAny } from '../../types/common'

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    schema: {
      type: Object as () => ISchema,
      default: () => ({
        renderType: 'Object',
        properties: {},
      })
    },
    customContext: {
      type: Object as () => IObjectAny,
      default: () => ({})
    }
  })

  const formData = ref<IObjectAny>({})
  const fieldKeys = computed(() => Object.keys(props.schema.properties))

  const getFormField = (prop: string): ISchemaFormItem => {
    return props.schema.properties[prop] || {}
  }

  const getFormFieldShow = (prop: string) => {
    return execStatement({
      statement: (getFormField(prop) as ISchemaFormItem).hidden,
      rootData: formData.value,
      context: props.customContext,
    })
  }

  const getFormFieldComponent = (prop: string): Component | undefined => {
    const formField = getFormField(prop)
    if (formField?.renderType === 'Custom') {
      return formField.component
    }
    return GLOBAL_CONFIG.renderers[formField.renderType]
  }

  const getPlaceholder = (prop: string) => {
    const formField = getFormField(prop)
    if (formField.renderOptions?.placeholder) {
      return formField.renderOptions.placeholder
    }
    if (['InputText', 'InputNumber'].includes(formField.renderType)) {
      return `请输入${formField.title}`;
    }
    if (/select|cascader|date/.test(formField.renderType.toLowerCase())) {
      return `请选择${formField.title}`;
    }
    return formField.title || ''
  }
</script>
<style lang="scss"></style>