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
 * @description 根据文件｜图片链接下载文件｜图片
 */
export function downloadFile(file_url: string, file_name?: string) {
  if (!file_url) return
  if (typeof fetch === 'function') {
    fetch(file_url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = file_name || extraFileName(file_url) || 'download.png'
        link.click()
        window.URL.revokeObjectURL(url) // 释放内存
      })
      .catch((error) => console.error('Error downloading file:', error))
  } else {
    window.open(file_url, '_blank')
  }
}
