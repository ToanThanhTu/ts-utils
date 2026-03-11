/**
 * Picks specific keys from an object.
 * 
 * @example
 * ```ts
 * const user = { name: "Alice", age: 30, email: "alice@example.com" };
 * 
 * const picked = pick(user, ["name", "email"]);
 * // { name: "Alice", email: "alice@example.com" }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): {
  [P in K]: T[P]
} {
  const result = {} as { [P in K]: T[P] }

  for (const key of keys) {
    if (key in obj && !(key in result)) {
      result[key] = obj[key]
    }
  }

  return result
}