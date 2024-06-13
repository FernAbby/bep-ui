<template>
  <TablePlus :schema="schema" :columns="columns" :data="dataSource" @search="handleSearch" />
</template>
<script lang="ts" setup>
  import TablePlus from '@bep-ui/components/TablePlus/index.vue'
  import { computed } from 'vue'
  import type { ITablePlusProps } from '@bep-ui/components/TablePlus/interface'
  import { schema } from './schema'
  import { columns } from './columns'
  import { getDataSource } from './data'

  const dataSource = computed(() => {
    return getDataSource()
  })

  const handleSearch: ITablePlusProps['onSearch'] = ({ sp, pp }) => {
    console.log('handleSearch====>', sp, pp)
  }
</script>
