<template>
  <div :class="classnames('table-plus', rootClass)">
    <div v-if="isShowSearchForm" class="table-plus__search">
      <SearchForm
        ref="searchFormRef"
        v-bind="innerFormProps"
        :form-data="innerFormData"
        :schema="schema"
        :loading="loading"
        @search="handleSearch"
        @reset="handleSearch"
      />
    </div>
    <div v-if="hasToolBar" class="table-plus__toolbar">
      <div class="table-plus__toolbar-title">
        <slot name="table_title"></slot>
      </div>
      <div class="table-plus__setting">
        <slot name="table_setting"></slot>
      </div>
    </div>
    <div class="table-plus__table" v-loading="loading" element-loading-text="加载中...">
      <el-table
        ref="tableRef"
        :size="size"
        :data="innerDataSource"
        v-bind="attrs"
        @sort-change="handleSortChange"
      >
        <el-table-column
          v-if="selection"
          type="selection"
          align="center"
          width="50"
          v-bind="selection"
          :reserve-selection="selection.reserveSelection"
          :selectable="selection.selectable"
          :fixed="selection.fixed"
        />
        <el-table-column
          v-if="showIndex"
          type="index"
          label="序号"
          :width="indexWidth"
          align="center"
        />
        <template v-for="column in innerColumns" :key="column.dataIndex">
          <el-table-column
            v-bind="column.columnProps"
            :prop="column.dataIndex"
            :label="column.title"
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
              <template v-if="column.render">
                <component :is="renderCell(_scope, column.render)" />
              </template>
              <template v-else-if="column.component">
                <component :is="column.component" v-bind="getComponentProps(_scope)" />
              </template>
              <slot
                v-else-if="column.renderType === 'slot'"
                :name="`${column.dataIndex}`"
                :row="_scope.row"
                :column="_scope.column"
                :index="_scope.$index"
              >
                {{ _scope.row[column.dataIndex] || '-' }}
              </slot>
              <span v-else>
                {{ formatContent(_scope.row[column.dataIndex]) }}
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div v-if="isShowPagination" class="table-plus__pagination">
        <slot name="pagination_left"></slot>
        <el-pagination
          v-bind="innerPaginationProps"
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentPageChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
  import { isEmpty, isPlainObject, classnames } from 'biz-gadgets'
  import { ref, computed, h, watch, useSlots, useAttrs, type Component, onMounted } from 'vue'
  import type { ISearchFormRef } from '@bep-ui/components/SearchForm/interface'
  import { defaultColumnProps, defaultPaginationProps, tableProps } from './table'
  import { IPagination, ITableColumn, ITableColumnScope, ITablePlusRef } from './interface'
  import SearchForm from '../SearchForm/index.vue'
  import { isVNode, mergePagination } from './utils'
  import type { IObjectAny } from '../../global'

  defineOptions({
    name: 'TablePlus',
    inheritAttrs: false
  })

  const emits = defineEmits(['search'])
  const slots = useSlots()
  const props = defineProps(tableProps)
  const attrs = useAttrs()

  const tableRef = ref<InstanceType<typeof ElTable>>()
  const loading = ref(false)
  const innerDataSource = ref<IObjectAny[]>([])
  const isShowPagination = ref(true)
  const pagination = ref<IPagination>({
    currentPage: 1,
    pageSize: 20,
    total: 0
  })
  const searchFormRef = ref<ISearchFormRef>()
  let searchParams = {}
  const isShowSearchForm = computed(() => !isEmpty(props.schema))
  const hasToolBar = computed(() => slots['table_title'] || slots['table_setting'])
  const innerFormData = computed({
    get: (): IObjectAny => props.formData,
    set: (value) => {
      console.log('innerFormData===> set', value)
      return value
    }
  })
  const innerFormProps = computed(() => {
    return { size: props.size, ...props.formProps }
  })

  watch(
    () => loading.value,
    (value) => {
      console.log('value ===>', value)
    },
    {
      immediate: true
    }
  )

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
    return {
      ...defaultPaginationProps,
      size: props.size,
      ...props.paginationProps
    }
  })

  const renderCell = (
    scope: ITableColumnScope,
    renderFn: (scope: ITableColumnScope) => Component | string
  ) => {
    const result = renderFn(scope)
    if (isVNode(result)) {
      return result
    }
    if (!isEmpty(result)) {
      return h('span', result as string)
    }
    return h('span', '-')
  }

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

  // 表格查询
  const tableSearchFn = async (_sp: IObjectAny = {}) => {
    if (props.request) {
      loading.value = true
      const res = await props.request({
        sp: { ..._sp, ...searchParams },
        pp: {
          page: pagination.value.currentPage,
          page_size: pagination.value.pageSize
        }
      })
      if (res) {
        innerDataSource.value = res.data
        mergePagination(pagination, res)
        loading.value = false
      }
    } else {
      emits('search', {
        sp: searchParams,
        pp: {
          page: pagination.value.currentPage,
          page_size: pagination.value.pageSize
        }
      })
    }
  }

  // 查询
  const handleSearch = (sp: IObjectAny = {}) => {
    searchParams = sp
    pagination.value.currentPage = 1
    tableSearchFn()
  }

  // 复位滚动条
  const resetScroll = () => {
    tableRef.value?.setScrollTop(0)
    tableRef.value?.setScrollLeft(0)
  }

  // 分页数量
  const handlePageSizeChange = (pageSize: number) => {
    pagination.value.pageSize = pageSize
    tableSearchFn()
    resetScroll()
  }

  // 切换页码
  const handleCurrentPageChange = (currentPage: number) => {
    pagination.value.currentPage = currentPage
    tableSearchFn()
    resetScroll()
  }

  const handleSortChange = ({ column, prop, order }) => {
    if (column.sortable === 'custom') {
      pagination.value.currentPage = 1
      if (order) {
        innerFormData.value.order_by = `${prop}_${order === 'ascending' ? 'asc' : 'desc'}`
      } else {
        innerFormData.value.order_by = ''
      }
      tableSearchFn()
    }
  }

  onMounted(() => {
    // 挂载后是否加载数据
    if (props.isFirstRequest) {
      if (searchFormRef.value?.search) {
        searchFormRef.value?.search(props.defaultValue)
      } else {
        handleSearch(props.defaultValue)
      }
    }
  })

  defineExpose<ITablePlusRef>({
    getTableRef: () => {
      return tableRef.value
    },
    refresh: () => {
      if (searchFormRef.value?.search) {
        searchFormRef.value.search()
      } else {
        handleSearch()
      }
    },
    clearSelection: () => {
      tableRef.value?.clearSelection()
    },
    toggleAllSelection: () => {
      tableRef.value?.toggleAllSelection()
    },
    setLoading: (isLoading) => {
      loading.value = isLoading
    },
    getFormData: () => {
      return searchFormRef.value?.getFormData()
    },
    resetScroll: resetScroll
  })
</script>
<style lang="scss">
  .table-plus {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .table-plus__toolbar {
      display: flex;
      padding: 3px 0 5px;

      .table-plus__toolbar-title {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
    }

    .table-plus__table {
      flex: 1;
      height: 0;
      display: flex;
      flex-direction: column;

      .el-table--fit {
        flex: 1;
        height: 0;
      }

      .table-plus__pagination {
        padding-top: 12px;
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
