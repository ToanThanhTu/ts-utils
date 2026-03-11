import { describe, expect, it } from "vitest";
import { pick } from './pick';

describe("pick", () => {
  it('picks specific keys and corresponding values from an object', () => {
    const person = {
      name: 'Alice',
      email: 'alice@gmail.com',
      address: '123 Main St, Townsville ABC 1234, Country',
      phone: '0122223333',
      occupation: 'Designer',
      company: 'DEF Pty Ltd',
    }

    const result = pick(person, ['name', 'email', 'phone'])

    expect(result).toEqual({
      name: "Alice",
      email: "alice@gmail.com",
      phone: '0122223333'
    })
  })

  it('returns an empty object for an empty array', () => {
    const person = {
      name: 'Alice',
      email: 'alice@gmail.com',
      address: '123 Main St, Townsville ABC 1234, Country',
      phone: '0122223333',
      occupation: 'Designer',
      company: 'DEF Pty Ltd',
    }

    const result = pick(person, [])
    expect(result).toEqual({})
  })

  it('picks a single key', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(pick(obj, ['b'])).toEqual({ b: 2 })
  })

  it('picks all keys', () => {
    const obj = { a: 1, b: 2 }
    expect(pick(obj, ['a', 'b'])).toEqual({ a: 1, b: 2 })
  })

  it('handles values that are undefined or null', () => {
    const obj = { a: undefined, b: null, c: 3 }
    expect(pick(obj, ['a', 'b'])).toEqual({ a: undefined, b: null })
  })

  it('handles nested objects without deep copying', () => {
    const nested = { x: 1 }
    const obj = { a: nested, b: 2 }
    const result = pick(obj, ['a'])
    expect(result).toEqual({ a: { x: 1 } })
    expect(result.a).toBe(nested)
  })
})