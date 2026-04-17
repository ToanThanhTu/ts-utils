/**
 * Capitalises the first letter of each word in a string and lowercases the rest.
 *
 * @example
 * ```ts
 * toPascalCase("hello world");   // "Hello World"
 * toPascalCase("FOO_BAR baz");   // "Foo_Bar Baz"
 * ```
 */
export function toPascalCase(str: string) {
  return str.replace(/(\w)(\w*)/g, function (_g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase()
  })
}
