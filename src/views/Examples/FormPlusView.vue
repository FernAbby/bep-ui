<template>
  <FormPlus :schema="schema" :model="form" />
</template>
<script lang="ts" setup>
  import FormPlus from '@packages/bep-ui/components/FormPlus/index.vue'
  import { ref } from 'vue'

  const schema = {
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
      },
      grade: {
        title: '年级',
        renderType: 'Select',
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
