/**
 * @description 开启休眠
 * @param {number} time 休眠时间（毫秒）
 */
export function sleep(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
