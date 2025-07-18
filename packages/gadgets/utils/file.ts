/**
 * @description 提取链接中的文件名
 * @param {string} url 文件链接
 */
export function extraFileName(url: string): string {
  const match = decodeURIComponent(url).match(/[^/]*$/)
  if (match) {
    return (match[0] || '').split('?')[0]
  }
  return ''
}

/**
 * @description 提取链接中的文件后缀名
 * @param { string } url 文件链接
 */
export function extraFileExtension(url: string) {
  // 移除查询参数和哈希
  const cleanUrl = url.split('?')[0].split('#')[0]
  // 提取文件扩展名（小写）
  return cleanUrl.split('.').pop().toLowerCase()
}

// 常见图片扩展名
export const ImageExtensions = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'svg',
  'bmp',
  'tif',
  'tiff'
])

/**
 * @description 判断是否为图片链接
 * @param { string } url 文件链接
 */
export function isImageUrl(url: string) {
  return url && ImageExtensions.has(extraFileExtension(url))
}

/**
 * @description 判断是否为 PDF 链接
 * @param { string } url 文件链接
 */
export function isPdfUrl(url: string) {
  return url && extraFileExtension(url) === 'pdf'
}

/**
 * @description 判断是否为同一域下
 * @param { string } url 文件链接
 */
export function isSameOrigin(url: string) {
  // 1. 创建当前页面和文件的URL对象
  const currentUrl = new URL(window.location.href)
  const targetUrl = new URL(url, window.location.href) // 支持相对路径

  // 2. 比较协议、主机名、端口
  return (
    currentUrl.protocol === targetUrl.protocol &&
    currentUrl.hostname === targetUrl.hostname &&
    currentUrl.port === targetUrl.port
  )
}
