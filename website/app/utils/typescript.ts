export function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error(`Not a string typeof=${typeof val} "${val}"`)
  }
}