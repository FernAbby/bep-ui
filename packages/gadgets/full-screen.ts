import { isString } from './typeof'

export type IFullScreenElement = HTMLElement & {
  mozRequestFullScreen: () => Promise<void>
  webkitRequestFullscreen: () => Promise<void>
  msRequestFullscreen: () => Promise<void>
}

/**
 * @description 开启全屏功能
 * @param el ｜element {String | HTMLElement} 节点ID
 */
export function requestFullScreen(el: string | HTMLElement) {
  const element = (isString(el) ? document.getElementById(el as string) : el) as IFullScreenElement
  if (!element) return
  element.style.backgroundColor = '#ffffff'
  if (element.requestFullscreen) {
    return element.requestFullscreen()
  }
  if (element.webkitRequestFullscreen) {
    return element.webkitRequestFullscreen()
  }
  if (element.mozRequestFullScreen) {
    return element.mozRequestFullScreen()
  }
  if (element.msRequestFullscreen) {
    // IE11
    return element.msRequestFullscreen()
  } else {
    console.warn('浏览器不支持全屏功能')
  }
}

export type IDocumentElement = Document & {
  mozCancelFullScreen: () => Promise<void>
  webkitExitFullscreen: () => Promise<void>
  msExitFullscreen: () => Promise<void>
}

// 退出全屏功能
export function exitFullScreen() {
  const element = document as IDocumentElement
  if (element.exitFullscreen) {
    return element.exitFullscreen()
  }
  if (element.webkitExitFullscreen) {
    return element.webkitExitFullscreen()
  }
  if (element.mozCancelFullScreen) {
    return element.mozCancelFullScreen()
  }
  if (element.msExitFullscreen) {
    return element.msExitFullscreen()
  }
}
