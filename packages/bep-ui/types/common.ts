import type { VNode, VNodeChild } from 'vue'

export type Recordable<T = any> = Record<string, T>

export type VueNode = VNodeChild | VNode
