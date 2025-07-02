<template>
  <TablePlus
    row-key="id"
    show-index
    :formProps="searchProps"
    :schema="schema"
    :columns="columns"
    :request="fetchTableList"
  />
</template>
<script lang="ts" setup>
  import TablePlus from '@bep-ui/components/TablePlus/index.vue'
  import type { ITablePlusProps } from '@bep-ui/components/TablePlus/interface'
  import { schema } from './schema'
  import { columns } from './columns'
  import { generateDataSource } from '@/views/examples/TablePlus/data'

  const searchProps = {
    labelWidth: '70px'
  }

  const dataSource = generateDataSource(50)

  const fetchTableList: ITablePlusProps['request'] = async ({ sp, pp }) => {
    const page_size = 20 || pp.page_size
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        const data = dataSource.slice((pp.page - 1) * page_size, pp.page * page_size)
        resolve(data)
      }, 3000)
    })
    return {
      data: res,
      pageSize: page_size,
      total: 0
    }
  }
</script>
