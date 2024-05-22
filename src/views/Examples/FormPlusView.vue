<template>
  <FormPlus :schema="schema" :model="form" :rules="rules" label-width="70px" />
</template>
<script lang="ts" setup>
  import FormPlus from '@packages/bep-ui/components/FormPlus/index.vue'
  import { ref } from 'vue'
  import type { ISchema } from '@bep-ui/components'

  const rules = {
    age: [
      { min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'blur' },
    ]
  }

  const schema: ISchema = {
    renderType: 'Object',
    properties: {
      baseInfo: {
        title: '基本信息',
        renderType: 'SectionTitle',
      },
      name: {
        title: '姓名',
        renderType: 'InputText',
        required: true,
      },
      age: {
        title: '年龄',
        renderType: 'InputNumber',
        required: true,
        renderOptions: {
          max: 10,
        }
      },
      sex: {
        title: '性别',
        renderType: 'RadioGroup',
        renderOptions: {
          options: [
            {
              label: '男',
              value: 'male',
            },
            {
              label: '女',
              value: 'female',
            },
          ]
        }
      },
      grade: {
        title: '年级',
        renderType: 'Select',
        required: true,
        renderOptions: {
          multiple: true,
          options: [
            {
              label: '一年级',
              value: '1',
            },
            {
              label: '二年级',
              value: '2',
            },
            {
              label: '三年级',
              value: '3',
            },
          ]
        }
      },
      course: {
        title: '课程',
        renderType: 'Checkbox',
        renderOptions: {
          options: [
            {
              label: '语文',
              value: '1',
            },
            {
              label: '数学',
              value: '2',
            },
            {
              label: '英语',
              value: '3',
            },
            {
              label: '化学',
              value: '4',
            },
          ]
        },
        required: true,
      }
    }
  }
  const form = ref({
    name: '测试'
  })
</script>
