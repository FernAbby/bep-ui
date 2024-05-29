interface IFragmentLoader {
  /* 列表总数据 */
  dataList: any[]
  /* 分段大小，每次多少条数据 */
  fragmentSize?: number
}

type IRequestFn = (fragmentData: any) => Promise<any>

interface IOnProgressOpts {
  // 批次
  batch: number
  // 当前排序
  current: number
  // 请求完成计数
  count: number
  // 共计
  total: number
  // 百分比
  percent: number
}

type IOnProgressFn = (opts: IOnProgressOpts) => void

type IOnDone = (resData: any[]) => void

type IOnFail = (err: Error) => void

/**
 * 分片/分段数据加载器
 */
class FragmentLoader {
  /* 列表总数据 */
  private _dataList: any[]

  /* 分段大小，每次多少条数据 */
  private _fragmentSize: number

  /* 发送多少批次 */
  private _batchSize: number

  /* 请求函数 */
  private _requestFn?: IRequestFn

  /* 加载进度回调函数 */
  private _onProgressFn?: IOnProgressFn

  /* 加载完成的回调函数 */
  private _onDone?: IOnDone

  /* 加载失败的回调函数 */
  private _onFail?: IOnFail

  /* 是否中断请求 */
  private _aborted = false

  /* 响应的数据 */
  private _responseData: any[] = []

  constructor({ dataList, fragmentSize }: IFragmentLoader) {
    this._dataList = [...dataList]
    // 默认分段大小为 3 个数据
    this._fragmentSize = fragmentSize || 3
    // 总共发送多少批次，一个批次发送 _fragmentSize 个数据
    this._batchSize = Math.ceil(this._dataList.length / this._fragmentSize)
  }

  /**
   * 依批次请求数据，每批次请求 3 个
   */
  async startup() {
    if (!this._requestFn) {
      throw new Error('缺少 request 函数')
      return
    }

    if (this._dataList.length === 0) {
      this._onDone?.([])
      return
    }
    let count = 0
    // 分批次请求
    for (let i = 0; i < this._batchSize; i++) {
      if (this._aborted) {
        return
      }

      // 每批的基数
      const baseIndex = i * this._fragmentSize

      // 分批请求集合
      const fnPromises: Promise<any>[] = []

      // 最后次请求数 = 长度 - 已上传完成数量
      const requestCount =
        i + 1 === this._batchSize
          ? this._dataList.length - i * this._fragmentSize
          : this._fragmentSize

      // 创建分段数据，发送请求
      for (let j = 0; j < requestCount; j++) {
        const currentIndex = baseIndex + j
        const fragmentItem = this._dataList[currentIndex]
        if (fragmentItem) {
          const promise = this._requestFn(fragmentItem).finally(() => {
            count++
            this._onProgressFn?.({
              batch: i + 1, // 批次
              current: currentIndex, // 整体索引index
              count, // 上传完成计数
              total: this._dataList.length, // 数据长度
              percent: Math.floor((count / this._dataList.length) * 100) // 进度百分比
            })
          })
          fnPromises.push(promise)
        }
      }
      try {
        const res = await Promise.allSettled(fnPromises)

        if (!this._aborted) {
          ;(res || []).forEach((item) => {
            this._responseData.push(item)
          })
        }
      } catch (error) {
        this._onFail?.(error instanceof Error ? error : Error(String(error)))
      }
    }
    this._onDone?.(this._responseData)
  }

  /**
   * 发送请求的函数
   */
  request(fn: IRequestFn) {
    this._requestFn = fn
  }

  /**
   * 进度变更事件
   */
  onProgress(fn: IOnProgressFn) {
    this._onProgressFn = fn
  }

  /**
   * 加载完成的回调函数
   */
  onDone(fn: IOnDone) {
    this._onDone = fn
  }

  /**
   * 加载失败的回调函数
   */
  onFail(fn: IOnFail) {
    this._onFail = fn
  }

  /**
   * 中断请求
   */
  abort() {
    this._aborted = true
    // 数据垃圾回收
    this._dataList = null as any
    this._responseData = null as any
  }
}

export interface IFragmentLoadParams extends IFragmentLoader {
  request: IRequestFn
  onProgress: IOnProgressFn
  onDone?: IOnDone
  onFail?: IOnFail
}

export interface IFragmentLoadListResult {
  abort: () => void
  startup: () => Promise<any[]>
}

/**
 * 分片/分段数据加载简易调用函数
 */
const useFragmentLoad = ({
  dataList,
  fragmentSize,
  request,
  onProgress,
  onDone,
  onFail
}: IFragmentLoadParams): IFragmentLoadListResult => {
  const loader = new FragmentLoader({ dataList, fragmentSize })

  loader.request(request)
  loader.onProgress(onProgress)

  return {
    abort: () => loader.abort(),
    startup: () =>
      new Promise<any[]>((resolve, reject) => {
        if (onDone) {
          loader.onDone(onDone)
        } else {
          loader.onDone((resData) => resolve(resData))
        }

        if (onFail) {
          loader.onFail(onFail)
        } else {
          loader.onFail((err) => reject(err))
        }

        loader.startup()
      })
  }
}

export default useFragmentLoad
