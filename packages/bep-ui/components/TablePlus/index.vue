<template>
  <div class="table-plus">
    <div class="table-plus__search">
      <SearchForm :schema="schema" />
    </div>
    <div class="table-plus__toolbar">
      <div class="table-plus__toolbar-title">
        <slot name="title"></slot>
      </div>
      <div class="table-plus__table-setting"></div>
    </div>
    <div class="table-plus__table">
      <el-table :size="'small'" :data="innerDataSource">
        <el-table-column
          v-if="selection"
          type="selection"
          align="center"
          width="50"
          :reserve-selection="selection.reserveSelection"
          :selectable="selection.selectable"
          :fixed="selection.fixed"
        />
        <el-table-column v-if="showIndex" type="index" label="序号" width="55" align="center" />
        <template v-for="column in innerColumns" :key="column.dataIndex">
          <el-table-column
            :prop="column.dataIndex"
            :label="column.title"
            v-bind="column.columnProps"
          >
            <template v-if="column.renderType === 'slot'" #header="_scope">
              <slot
                :name="`${column.dataIndex}_header`"
                :column="_scope.column"
                :index="_scope.$index"
              >
                {{ column.title }}
              </slot>
            </template>
            <template #default="_scope">
              <span v-if="column.renderType === 'text'">
                {{ formatContent(_scope.row[column.dataIndex]) }}
              </span>
              <slot
                v-else-if="column.renderType === 'slot'"
                :name="`${column.dataIndex}`"
                :row="_scope.row"
                :column="_scope.column"
                :index="_scope.$index"
              >
                {{ _scope.row[column.dataIndex] || '-' }}
              </slot>
              <component
                :is="column.component"
                v-else-if="column.renderType === 'custom'"
                v-bind="getComponentProps(_scope)"
              />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ElTable } from 'element-plus'
  import { isEmpty } from 'biz-gadgets'
  import { ref, computed, watch } from 'vue'
  import { defaultColumnProps, tableProps } from './table'
  import type { ITableColumn, ITableColumnScope } from './interface'
  import SearchForm from '../SearchForm/index.vue'

  // const slots = useSlots()
  const props = defineProps(tableProps)

  const innerDataSource = ref<Record<string, any>[]>([])

  watch(
    () => props.dataSource,
    (value) => {
      console.log('value===>', value)
      innerDataSource.value = value
    }
  )

  const innerColumns = computed(() => {
    return props.columns.map((item) => {
      return {
        ...item,
        columnProps: { ...defaultColumnProps, ...(item.columnProps || {}) }
      }
    }) as ITableColumn[]
  })

  const formatContent = (text: string) => {
    return isEmpty(text) ? '-' : text
  }
  // 获取自定义组件属性
  const getComponentProps = (scope: ITableColumnScope) => {
    if (scope.column?.componentProps) {
      return scope.column.componentProps(scope)
    }
    return scope
  }
</script>
<style lang="scss">
  .table-plus {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .table-plus__table {
      flex: 1;
      height: 0;
    }
  }
</style>
