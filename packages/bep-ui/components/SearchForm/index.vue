<template>
  <form-plus :schema="schema" layout="grid">
    <template #append>
      <el-button :icon="RefreshLeft">重置</el-button>
      <el-button :icon="Search" type="primary">查询</el-button>
    </template>
  </form-plus>
</template>
<script lang="ts" setup>
  import { RefreshLeft, Search } from '@element-plus/icons-vue'
  import type { ISchema } from '@bep-ui/components'
  import FormPlus from '../FormPlus/index.vue'
  const props = defineProps({
    schema: {
      type: Object as () => ISchema,
      default: () => ({
        renderType: 'Object',
        properties: {}
      })
    }
  })
</script>
