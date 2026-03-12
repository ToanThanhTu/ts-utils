import { describe, it, expect } from 'vitest'
import { deepFreeze } from './deep-freeze'

describe('deepFreeze', () => {
  it('should freeze a flat object', () => {
    const obj = { name: 'Alice', age: 30 }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(frozen.name).toBe('Alice')
    expect(frozen.age).toBe(30)
  })

  it('should freeze nested objects', () => {
    const obj = { api: { url: 'https://example.com', retries: 3 } }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.api)).toBe(true)
  })

  it('should freeze deeply nested objects', () => {
    const obj = { a: { b: { c: { d: 'deep' } } } }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.a)).toBe(true)
    expect(Object.isFrozen(frozen.a.b)).toBe(true)
    expect(Object.isFrozen(frozen.a.b.c)).toBe(true)
  })

  it('should freeze arrays', () => {
    const obj = { tags: ['a', 'b', 'c'] }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen.tags)).toBe(true)
  })

  it('should freeze objects inside arrays', () => {
    const obj = { users: [{ name: 'Alice' }, { name: 'Bob' }] }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen.users)).toBe(true)
    expect(Object.isFrozen(frozen.users[0])).toBe(true)
    expect(Object.isFrozen(frozen.users[1])).toBe(true)
  })

  it('should handle null values without error', () => {
    const obj = { a: 1, b: null, c: 'hello' }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(frozen.b).toBeNull()
  })

  it('should handle circular references without infinite recursion', () => {
    const obj: Record<string, unknown> = { name: 'circular' }
    obj.self = obj

    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(frozen.self).toBe(frozen)
  })

  it('should prevent mutation of top-level properties', () => {
    const obj = { name: 'Alice' }
    const frozen = deepFreeze(obj)

    expect(() => {
      (frozen as Record<string, unknown>).name = 'Bob'
    }).toThrow()
  })

  it('should prevent mutation of nested properties', () => {
    const obj = { api: { retries: 3 } }
    const frozen = deepFreeze(obj)

    expect(() => {
      (frozen.api as Record<string, unknown>).retries = 5
    }).toThrow()
  })

  it('should skip already frozen objects', () => {
    const nested = Object.freeze({ value: 42 })
    const obj = { nested }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.nested)).toBe(true)
  })

  it('should preserve original values', () => {
    const obj = { a: 1, b: 'hello', c: true, d: { e: [1, 2, 3] } }
    const frozen = deepFreeze(obj)

    expect(frozen.a).toBe(1)
    expect(frozen.b).toBe('hello')
    expect(frozen.c).toBe(true)
    expect(frozen.d.e).toEqual([1, 2, 3])
  })
})
