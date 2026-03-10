/**
 * Groups an array of items by a key extracted from each item.
 * 
 * @example
 * ```ts
 * const people = [
 *   { name: "Alice", dept: "Engineering" },
 *   { name: "Bob", dept: "Marketing" },
 *   { name: "Charlie", dept: "Engineering" }
 * ]
 * 
 * const grouped = groupBy(people, (p) => p.dept)
 * // {
 * //   Engineering: [{ name: "Alice", ... }, { name: "Charlie", ... }],
 * //   Marketing: [{ name: "Bob", ... }]
 * // }
 * ```
 */
export function groupBy<T, K extends string | number | symbol>(
  items: readonly T[],
  fn: (item: T) => K,
): Record<K, T[]> {
  const result = {} as Record<K, T[]>

  for (const item of items) {
    const key = fn(item)

    if (!(key in result)) {
      result[key] = []
    }

    result[key].push(item)
  }

  return result
}