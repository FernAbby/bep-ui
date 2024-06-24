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
    return generateDataSource()
  })

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
