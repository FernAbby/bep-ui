<template>
  <TablePlus :schema="schema" :columns="columns" :data="dataSource" @search="handleSearch" />
  <TablePlus
    row-key="id"
    :schema="schema"
    :form-props="searchProps"
    :columns="columns"
    :request="fetchTableList"
  />
</template>
<script lang="ts" setup>
  import { uuidv4 } from '@gadgets/index'
  import TablePlus from '@bep-ui/components/TablePlus/index.vue'
  import { computed } from 'vue'
  import type { ITableColumn, ITablePlusProps } from '@bep-ui/components/TablePlus/interface'

  const searchProps = {
    labelWidth: '70px'
  }

  const schema = {
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
    },
    grade: {
      title: '班级',
      renderType: 'InputText'
    },
    date: {
      title: '入学时间',
      renderType: 'DateTime'
    }
  }
  const columns: ITableColumn[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      columnProps: {
        width: 100
      }
    },
    {
      title: '性别',
      dataIndex: 'sex'
    },
    {
      title: '联系方式',
      dataIndex: 'mobile'
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
  const dataSource = computed(() => {
    return [1, 2, 3, 4, 5, 6, 7, 9, 10].map((item, index) => {
      return {
        id: uuidv4(),
        name: `张三 ${index + 1}`,
        sex: index % 2 === 0 ? '男' : '女',
        mobile: '18888888888',
        class: '3年级2班',
        address: '成都市高新区天府二街世豪广场'
      }
    })
  })
  const handleSearch: ITablePlusProps['onSearch'] = ({ sp, pp }) => {
    console.log('handleSearch====>', sp, pp)
  }
  const fetchTableList = async () => {
    const res = await dataSource.value
    return {
      data: res,
      total: res.length,
      pageSize: 20,
      currentPage: 1
    }
  }
</script>
