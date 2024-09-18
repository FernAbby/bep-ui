export function getNumber(num?: number | string | null, defaultZero = true) {
  if (typeof num === 'number') return num
  if (num && typeof num === 'string') {
    return parseFloat(num)
  }
  return defaultZero ? 0 : num
}
