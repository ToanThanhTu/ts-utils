/**
 * Recursively freezes an object and all nested objects, with circular reference protection.
 *
 * @example
 * ```ts
 * const config = deepFreeze({ api: { url: "...", retries: 3 } });
 * config.api.retries = 5; // TypeScript error!
 * ```
 */
export function deepFreeze<T extends Record<string, unknown>>(
  obj: T,
): DeepReadonly<T> {
  const visited = new WeakSet()
  visited.add(obj)

  const freezeRecursive = (obj: Record<string, unknown>, visited: WeakSet<WeakKey>) => {
    for (const p in obj) {
      if (typeof obj[p] === 'object' && obj[p] !== null && !(visited.has(obj[p]))) {
        visited.add(obj[p])
        freezeRecursive(obj[p] as Record<string, unknown>, visited)
      }
    }

    return (Object.isFrozen(obj) ? obj : Object.freeze(obj)) as DeepReadonly<T>
  }

  return freezeRecursive(obj, visited)
}

type DeepReadonly<T extends object> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends (infer U)[] 
      ? readonly DeepReadonly<U & object>[] 
      : DeepReadonly<T[P]>
    : T[P]
}