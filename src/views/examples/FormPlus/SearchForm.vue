<template>
  <SearchForm
    :form-data="formData"
    :schema="schema"
    :loading="loading"
    @search="handleSearch"
    @reset="handleSearch"
  />
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import SearchForm from '@bep-ui/components/SearchForm/index.vue'
  import type { IOption } from '@bep-ui/components'

  const loading = ref(false)
  const formData = ref({
    address: '地址信息'
  })
  const schema = {
    name: {
      title: '姓名',
      renderType: 'InputText',
      required: true,
      tooltip: '姓名是必填项'
    },
    age: {
      title: '年龄',
      renderType: 'InputNumber',
      required: true,
      renderOptions: {
        max: 10
      }
    },
    sex: {
      title: '性别',
      renderType: 'RadioGroup',
      renderOptions: {
        options: [
          {
            label: '男',
            value: 'male'
          },
          {
            label: '女',
            value: 'female'
          }
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
            value: '1'
          },
          {
            label: '二年级',
            value: '2'
          },
          {
            label: '三年级',
            value: '3'
          },
          {
            label: '四年级',
            value: '4'
          },
          {
            label: '五年级',
            value: '5'
          }
        ]
      }
    },
    course: {
      title: '课程',
      renderType: 'CheckboxGroup',
      renderOptions: {
        options: [
          {
            label: '语文',
            value: '1'
          },
          {
            label: '数学',
            value: '2'
          },
          {
            label: '英语',
            value: '3'
          },
          {
            label: '化学',
            value: '4'
          }
        ]
      },
      required: true
    },
    date: {
      title: '报名日期',
      renderType: 'DateTime',
      required: true
    }
  }

  const handleSearch = (value: string) => {}
</script>
