<template>
  <TablePlus :schema="schema" :columns="columns" :dataSource="dataSource" />
</template>
<script lang="ts" setup>
  import TablePlus from '@bep-ui/components/TablePlus/index.vue'
  const schema = {
    renderType: 'Object',
    properties: {
      name: {
        title: '姓名',
        renderType: 'InputText'
      },
      sex: {
        title: '性别',
        renderType: 'Select',
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
      }
    }
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '年级',
      dataIndex: 'grade'
    },
    {
      title: '班级',
      dataIndex: 'class'
    },
    {
      title: '地址',
      dataIndex: 'address'
    }
  ]
  const dataSource = [1, 2, 3, 4, 5, 6, 7, 9, 10].map((item, index) => {
    return {
      name: `张三 ${index + 1}`,
      grade: '1年级',
      class: '3年级2班'
    }
  })
</script>
