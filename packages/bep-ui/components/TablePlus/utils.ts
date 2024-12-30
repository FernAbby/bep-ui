import type { Ref } from 'vue'
import { h, toRaw } from 'vue'
import { isEmpty } from 'biz-gadgets'
import type { IPagination } from './interface'

// 合并分页数据值
export function mergePagination(pagination: Ref<IPagination>, value: IPagination) {
  const newPagination = { ...toRaw(pagination.value) }
  if (!isEmpty(value.currentPage)) {
    newPagination.currentPage = value.currentPage
  }
  if (!isEmpty(value.pageSize)) {
    newPagination.pageSize = value.pageSize
  }
  if (!isEmpty(value.total)) {
    newPagination.total = value.total
  }
  pagination.value = newPagination
}

export function isVNode(node: any) {
  const vNode = h.constructor
  return node instanceof vNode
}
