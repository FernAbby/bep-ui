import type { Ref } from 'vue'
import { h } from 'vue'
import { isEmpty } from 'biz-gadgets'
import type { IPagination } from './interface'

// 合并分页数据值
export function mergePagination(pagination: Ref<IPagination>, value: IPagination) {
  if (!isEmpty(value.currentPage)) {
    pagination.value.currentPage = value.currentPage
  }
  if (!isEmpty(value.pageSize)) {
    pagination.value.currentPage = value.pageSize
  }
  if (!isEmpty(value.total)) {
    pagination.value.total = value.total
  }
}

export function isVNode(node: any) {
  const vNode = h.constructor
  return node instanceof vNode
}
