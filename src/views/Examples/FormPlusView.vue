<template>
  <FormPlus ref="formRef" :schema="schema" :model="form" :rules="rules" label-width="70px" />
  <el-space>
    <el-button @click="handleReset">重置</el-button>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </el-space>
</template>
<script lang="ts" setup>
  import type { FormRules } from 'element-plus'
  import FormPlus from '@packages/bep-ui/components/FormPlus/index.vue'
  import { ref } from 'vue'
  import type { ISchema, IOption, IFormPlusRef } from '@bep-ui/components'
  import { states } from '@/const/select'

  const rules: FormRules = {
    age: [{ min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'change' }],
    grade: [{ required: true, message: 'grade is required', trigger: 'change' }]
  }

  const list: IOption[] = states.map((item, index) => ({
    value: `${index}`,
    label: item
  }))

  const schema: ISchema = {
    renderType: 'Object',
    properties: {
      baseInfo: {
        title: '基本信息',
        renderType: 'SectionTitle'
      },
      name: {
        title: '姓名',
        renderType: 'InputText',
        required: true
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
        renderType: 'Checkbox',
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
      city: {
        title: '城市',
        renderType: 'SearchSelect',
        renderOptions: {
          remoteMethod: (keyword: string) => {
            if (keyword) {
              return Promise.resolve(
                list.filter((item) => {
                  return item.label.toLowerCase().includes(keyword.toLowerCase())
                })
              )
            }
            return Promise.resolve(list)
          }
        }
      }
    }
  }
  const formRef = ref<IFormPlusRef>()
  const form = ref({
    name: '章三',
    age: 10
  })
  const handleSubmit = () => {
    formRef.value?.validate((isValid, invalidFields) => {
      console.log('isValid====>', isValid, invalidFields)
    })
  }
  const handleReset = () => {
    formRef.value?.reset()
  }
</script>
