export function deepClone<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr))
}
