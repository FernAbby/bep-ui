/**
 * @description 提取链接中的文件名
 */
export function extraFileName(url: string): string {
  const match = url.match(/[^/]*$/)
  if (match) {
    return (match[0] || '').split('?')[0]
  }
  return ''
}

/**
 * @description 下载blob文件
 */
export function baseDownload(blob: Blob, name: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  window.URL.revokeObjectURL(url) // 释放内存
}

/**
 * @description 根据图片链接生成canvas下载图片
 */
export function downloadImage(url: string, fileName?: string) {
  if (!url) {
    throw URIError('链接不能为空')
  }
  const canvas = document.createElement('canvas')
  const img = document.createElement('img')
  // 解决跨域 Canvas 污染问题
  img.setAttribute('crossOrigin', 'Anonymous')
  // 将资源链接赋值过去，才能触发img.onload事件
  img.src = url
  img.onload = function () {
    canvas.width = img.width
    canvas.height = img.height
    const context = canvas.getContext('2d')
    if (!context || !canvas) return
    // 绘制图片
    context.drawImage(img, 0, 0, img.width, img.height)
    canvas.getContext('2d')?.drawImage(img, 0, 0, img.width, img.height)
    // 将canvas转blob，然后创建一个a连接自动下载图片
    canvas.toBlob((blob) => {
      const file_name = fileName || extraFileName(url) || 'download.png'
      baseDownload(blob, file_name)
    })
  }
}

/**
 * @description 根据文件对象对象下载文件
 */
export function fileDownload(file: File, options?: BlobPropertyBag) {
  baseDownload(new Blob([file], options), file.name || '下载')
}

/**
 * @description 根据文件｜图片链接下载文件｜图片
 */
export function downloadFile(fileUrl: string, fileName?: string) {
  if (!fileUrl) {
    throw URIError('链接不能为空')
  }
  const file_name = fileName || extraFileName(fileUrl) || 'download.png'
  if (typeof fetch === 'function') {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        baseDownload(blob, file_name)
      })
      .catch((error) => console.error('Error downloading file:', error))
  } else if (XMLHttpRequest) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://example.com/somefile.txt', true)
    xhr.responseType = 'blob'

    xhr.onload = function () {
      if (this.status == 200) {
        baseDownload(this.response, file_name)
      } else {
        console.error('Error fetching resource')
      }
    }

    xhr.send()
  } else {
    window.open(fileUrl, '_blank')
  }
}
