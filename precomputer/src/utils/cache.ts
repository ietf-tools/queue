export const getCacheKey = (obj: unknown): string => {
  switch (typeof obj) {
    case 'bigint':
    case 'boolean':
    case 'function':
    case 'number':
    case 'string':
    case 'symbol':
    case 'undefined':
      return String(obj)
    case 'object':
      if (!obj) {
        return ''
      }
      return JSON.stringify(
        Object
          .entries(obj)
          .toSorted(([keyA], [keyB]) => keyA.localeCompare(keyB))
          .map(([key, value]) => `${key}=${getCacheKey(value)}`)
          .join('\n')
      )
  }
  return ''
}