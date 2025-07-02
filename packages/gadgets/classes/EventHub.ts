type ICallback = (data: any) => void

interface IWrappedCallback extends ICallback {
  original?: ICallback
}

class EventHub {
  // 存储事件和对应的回调函数
  private events = new Map<string, (ICallback | IWrappedCallback)[]>()

  /**
   * 订阅事件
   * @param {string} event 事件名称
   * @param {Function} callback 回调函数
   */
  on(event: string, callback: ICallback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    // 如果事件不存在，初始化一个空数组
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    // 将回调函数添加到事件队列
    this.events.get(event).push(callback)
  }

  /**
   * 发布事件
   * @param event 事件名称
   * @param args 传递给回调函数的参数
   */
  emit(event: string, data: any): void {
    // 获取事件对应的回调队列
    const callbacks = this.events.get(event)

    // 如果事件存在且有回调函数，则依次执行
    if (callbacks) {
      // 创建副本避免修改原始数组
      callbacks.slice().forEach((callback) => {
        callback(data)
      })
    }
  }

  /**
   * 取消订阅
   * @param event 事件名称
   * @param callback 要移除的回调函数
   */
  off(event: string, callback: ICallback): void {
    const callbacks = this.events.get(event)

    if (callbacks) {
      // 用户可能会调用 off(event, originalCallback) 来取消订阅，
      // 过滤掉要移除的回调函数，但事件中心实际存储的是 onceWrapper 函数，而不是原始回调
      const updatedCallbacks = callbacks.filter(
        (cb) => cb !== callback && (cb as IWrappedCallback).original !== callback
      )

      // 更新事件队列
      if (updatedCallbacks.length > 0) {
        this.events.set(event, updatedCallbacks)
      } else {
        // 如果没有回调函数了，删除事件
        this.events.delete(event)
      }
    }
  }

  /**
   * 一次性订阅
   * @param event 事件名称
   * @param callback 回调函数
   */
  once(event: string, callback: ICallback): void {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }

    // 包装回调函数
    const onceWrapper: IWrappedCallback = (data: any) => {
      // 执行原始回调
      callback(data)
      // 执行后移除
      this.off(event, onceWrapper)
    }

    // 保存原始引用用于取消订阅
    onceWrapper.original = callback

    // 订阅包装后的函数
    this.on(event, onceWrapper)
  }

  /**
   * 清空指定事件的所有订阅
   * @param event 事件名称
   */
  clear(event: string): void {
    this.events.delete(event)
  }

  /**
   * 清空所有事件的所有订阅
   */
  clearAll() {
    this.events.clear() // 直接清空所有条目
  }

  /**
   * 检查事件是否有订阅者
   * @param event 事件名称
   * @returns 是否存在订阅
   */
  has(event: string): boolean {
    return this.events.has(event) && this.events.get(event)!.length > 0
  }

  /**
   * 获取事件的所有订阅者数量
   * @param event 事件名称
   * @returns 订阅者数量
   */
  listenerCount(event: string): number {
    const callbacks = this.events.get(event)
    return callbacks ? callbacks.length : 0
  }
}

export default EventHub
