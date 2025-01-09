<template>
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
  import TablePlus from '@bep-ui/components/TablePlus/index.vue'
  import { computed } from 'vue'
  import type { ITablePlusProps } from '@bep-ui/components/TablePlus/interface'
  import { schema } from './schema'
  import { columns } from './columns'
  import { generateDataSource } from '@/views/examples/TablePlus/data'

  const searchProps = {
    labelWidth: '70px'
  }

  const dataSource = computed(() => {
    return generateDataSource(150)
  })

  const fetchTableList: ITablePlusProps['request'] = async ({ sp, pp }) => {
    const page_size = 30 || pp.page_size
    const data = dataSource.value.slice((pp.page - 1) * page_size, pp.page * page_size)
    const res = await Promise.resolve(data)
    return {
      data: res,
      pageSize: page_size,
      total: 150
    }
  }
</script>
