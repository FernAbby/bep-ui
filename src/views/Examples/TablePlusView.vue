<template>
  <TablePlus :schema="schema" :columns="columns" :data="dataSource" @search="handleSearch" />
  <TablePlus
    row-key="id"
    show-index
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
    return new Array(50).fill(0, 0).map((item, index) => {
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
  const fetchTableList: ITablePlusProps['request'] = async ({ sp, pp }) => {
    const data = dataSource.value.slice(
      (pp.currentPage - 1) * pp.pageSize,
      pp.currentPage * pp.pageSize
    )
    const res = await Promise.resolve(data)
    return {
      data: res,
      total: 50
    }
  }
</script>
