import { extraFileName, isImageUrl, isSameOrigin, isPdfUrl } from './file'

/**
 * @description 根据链接下载文件｜图片
 * @description 同源：‌后端响应头设置 Content-Disposition: inline(预览模式), 除图片、PDF、TXT、XML等 点击可预览的，浏览器无法查看的文件会下载;
 * @description 同源：后端响应头设置 Content-Disposition: attachment(附件模式)，包括图片、PDF、TXT、XML等 在内所有文件强制下载;
 * @description 跨域: 按默认行为处理
 * @param {string} url
 * @param {string} fileName
 */
export function baseDownload(url: string, fileName?: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = fileName || extraFileName(fileName)
  link.click()
}

/**
 * @description window.open 下载
 * @description Content-Disposition: inline；当文件类型是浏览器无法解析的（如.zip、.exe等）时，浏览器会自动触发下载，可预览文件（图片/PDF/TXT），开新标签页会直接查看；
 * @description Content-Disposition: attachment；所有文件强制下载；
 * @param { string } url 文件链接
 */
export function quickDownload(url: string) {
  if (isSameOrigin(url) && (isImageUrl(url) || isPdfUrl(url))) {
    baseDownload(url)
  } else {
    window.open(url, '_blank')
  }
}

/**
 * @description 下载blob类型文件
 * @param {Blob} blob
 * @param {string} fileName
 */
export function downloadBlob(blob: Blob, fileName?: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName || extraFileName(fileName)
  link.click()
  window.URL.revokeObjectURL(url) // 释放内存
}

/**
 * @description 下载File类型文件
 * @param {File} file
 * @param {BlobPropertyBag} options
 */
export function downloadFile(file: File, options?: BlobPropertyBag) {
  downloadBlob(new Blob([file], options), file.name || '下载')
}

/**
 * @description 根据图片链接生成canvas下载图片
 * @param {string} url
 * @param {string} fileName
 */
// export function downloadImage(url: string, fileName?: string) {
//   if (!url) {
//     throw URIError('下载链接不能为空')
//   }
//   const canvas = document.createElement('canvas')
//   const img = document.createElement('img')
//   // 解决跨域 Canvas 污染问题
//   img.setAttribute('crossOrigin', 'Anonymous')
//   // 将资源链接赋值过去，才能触发img.onload事件
//   img.src = url
//   img.onload = function () {
//     canvas.width = img.width
//     canvas.height = img.height
//     const context = canvas.getContext('2d')
//     if (!context || !canvas) return
//     // 绘制图片
//     context.drawImage(img, 0, 0, img.width, img.height)
//     canvas.getContext('2d')?.drawImage(img, 0, 0, img.width, img.height)
//     // 将canvas转blob，然后创建一个a连接自动下载图片
//     canvas.toBlob((blob) => {
//       if (blob) {
//         const file_name = fileName || extraFileName(url) || 'download.png'
//         downloadBlob(blob, file_name)
//       }
//     })
//   }
// }

/**
 * @description 根据链接下载文件｜图片
 * @param {string} fileUrl
 * @param {string} fileName
 */
export function downloadByUrl(fileUrl: string, fileName?: string) {
  if (!fileUrl) {
    throw URIError('下载链接不能为空')
  }
  const file_name = fileName || extraFileName(fileUrl) || 'download.png'
  if (typeof fetch === 'function') {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        downloadBlob(blob, file_name)
      })
      .catch((error) => {
        console.error('Error downloading file:', error)
        quickDownload(fileUrl)
      })
  } else if (XMLHttpRequest) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', fileUrl, true)
    xhr.responseType = 'blob'

    xhr.onload = function () {
      if (this.status === 200) {
        downloadBlob(this.response, file_name)
      } else {
        console.error('Error fetching resource')
        quickDownload(fileUrl)
      }
    }

    xhr.send()
  } else {
    quickDownload(fileUrl)
  }
}
