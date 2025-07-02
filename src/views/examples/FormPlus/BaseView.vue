<template>
  <div class="setting">
    <div class="setting-item">
      <div class="setting-item__label">布局:</div>
      <el-segmented v-model="settings.layout" :options="layoutOptions" />
    </div>
    <div class="setting-item">
      <div class="setting-item__label">尺寸:</div>
      <el-segmented v-model="settings.size" :options="sizeOptions" />
    </div>
    <div class="setting-item">
      <div class="setting-item__label">固定标签宽度:</div>
      <el-switch v-model="settings.labelWidth" />
    </div>
  </div>
  <el-divider />
  <FormPlus
    ref="formRef"
    :schema="schema"
    :model="form"
    :rules="rules"
    :label-width="settings.labelWidth ? 90 : 'auto'"
    :size="settings.size"
    :layout="settings.layout"
    @change="handleChange"
  >
    <template #append>
      <el-space>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-space>
    </template>
  </FormPlus>
</template>
<script lang="ts" setup>
  import type { FormRules } from 'element-plus'
  import FormPlus from '@bep-ui/components/FormPlus/index.vue'
  import { reactive, ref } from 'vue'
  import type { IOption, IFormPlusRef, IFormSchema } from '@bep-ui/components'
  import { states, sizeOptions, layoutOptions } from '@/const/select'

  const rules: FormRules = {
    age: [{ min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'change' }],
    grade: [{ required: true, message: 'grade is required', trigger: 'change' }]
  }

  const settings = reactive({
    labelWidth: false,
    size: 'default',
    layout: 'block'
  })

  const list: IOption[] = states.map((item, index) => ({
    value: `${index}`,
    label: item
  }))

  const schema: IFormSchema = {
    renderType: 'Object',
    properties: {
      baseInfo: {
        title: '基本信息',
        renderType: 'SectionTitle'
      },
      name: {
        title: '姓名',
        renderType: 'InputText',
        required: true,
        tooltip: '姓名是必填项'
      },
      address: {
        title: '家庭地址',
        renderType: 'Description'
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
      divider: {
        title: '分割线',
        renderType: 'Divider'
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
      },
      comment: {
        title: '评分',
        renderType: 'Rate',
        required: true
      },
      date: {
        title: '报名日期',
        renderType: 'DateTime',
        required: true
      },
      range: {
        title: '课程时间',
        renderType: 'DateTimeRange',
        required: true
      },
      color: {
        title: '颜色',
        renderType: 'ColorPicker',
        required: true
      },
      enable: {
        title: '是否启用',
        renderType: 'Switch',
        required: true
      },
      percent: {
        title: '进度',
        renderType: 'Slider',
        required: true
      }
    }
  }
  const formRef = ref<IFormPlusRef>()
  const form = ref({
    name: '张三',
    age: 10,
    address: '四川省成都市高新区天府三街世豪瑞丽1栋2单元2506',
    color: '#ffffff',
    percent: 60
  })
  const handleSubmit = () => {
    formRef.value?.validate((isValid, invalidFields) => {
      console.log('isValid====>', isValid, invalidFields)
    })
  }
  const handleReset = () => {
    formRef.value?.reset()
  }

  const handleChange = (e) => {
    console.log('e====>', e)
  }
</script>
<style>
  .setting {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;

    .setting-item {
      display: flex;
      align-items: center;
      gap: 3px;

      .setting-item__label {
        margin-right: 12px;
      }
    }
  }
</style>
