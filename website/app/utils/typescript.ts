export function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error(`Not a string typeof=${typeof val} "${String(val)}"`)
  }
}

export function assertNever(value: never) {
  console.trace();
  console.warn(`Unexpected value: ${String(value)}`);
  throw new Error(`Unexpected value: ${String(value)}`);
}