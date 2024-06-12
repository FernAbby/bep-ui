<template>
  <div class="table-plus">
    <div class="table-plus__search">
      <SearchForm v-bind="formProps" :schema="schema" @search="handleSearch" />
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
      <div v-if="isShowPagination" class="table-plus__pagination">
        <el-pagination
          v-bind="innerPaginationProps"
          v-model="pagination"
          :total="pagination.total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentPageChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ElTable } from 'element-plus'
  import { isEmpty, isPlainObject } from 'biz-gadgets'
  import { ref, computed, watch } from 'vue'
  import { defaultColumnProps, defaultPaginationProps, tableProps } from './table'
  import type { IPagination, ITableColumn, ITableColumnScope } from './interface'
  import SearchForm from '../SearchForm/index.vue'
  import { mergePagination } from './utils'

  const emits = defineEmits(['search'])
  // const slots = useSlots()
  const props = defineProps(tableProps)

  const innerDataSource = ref<Record<string, any>[]>([])
  const isShowPagination = ref(true)
  const pagination = ref<IPagination>({
    currentPage: 1,
    pageSize: 20,
    total: 0
  })

  // 分页配置
  watch(
    () => props.pagination,
    (value) => {
      if (value === false) {
        isShowPagination.value = false
      }
      if (value && isPlainObject(value)) {
        mergePagination(pagination, value as IPagination)
      }
    },
    {
      immediate: true
    }
  )

  // 表格数据
  watch(
    () => props.data,
    (value) => {
      if (value !== undefined) {
        console.log('props.dataSource===>', value)
        innerDataSource.value = value
      }
    },
    {
      immediate: true,
      deep: true
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

  const innerPaginationProps = computed(() => {
    return { ...defaultPaginationProps, ...props.paginationProps }
  })

  const formatContent = (text: string) => {
    return isEmpty(text) ? '-' : text
  }

  // 获取自定义组件属性并绑定
  const getComponentProps = (scope: ITableColumnScope) => {
    if (scope.column?.componentProps) {
      return scope.column.componentProps(scope)
    }
    return scope
  }

  // 分页数量
  const handlePageSizeChange = (pageSize: number) => {
    pagination.value.pageSize = pageSize
  }
  // 切换页码
  const handleCurrentPageChange = (currentPage: number) => {
    pagination.value.currentPage = currentPage
  }

  const handleSearch = async (sp: Record<string, any>) => {
    const pp = {
      currentPage: pagination.value.currentPage,
      pageSize: pagination.value.pageSize
    }
    if (props.request) {
      const res = await props.request(sp, pp)
      innerDataSource.value = res.data
      mergePagination(pagination, res)
    } else {
      emits('search', { sp, pp })
    }
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

      .table-plus__pagination {
        padding-top: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    .el-select--small .el-select__wrapper {
      min-height: 30px;
    }
  }
</style>
