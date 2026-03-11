import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { debounce } from "./debounce"

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("calls the function after the delay", async () => {
    const fn = vi.fn(() => "hello")
    const debounced = debounce(fn, 300)

    const promise = debounced()
    expect(fn).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(300)
    const result = await promise

    expect(fn).toHaveBeenCalledOnce()
    expect(result).toBe("hello")
  })

  it("resets the timer on subsequent calls", async () => {
    const fn = vi.fn(() => "done")
    const debounced = debounce(fn, 300)

    const promise1 = debounced().catch((e) => e)
    await vi.advanceTimersByTimeAsync(200)

    const promise2 = debounced()
    await vi.advanceTimersByTimeAsync(300)

    const result = await promise2
    expect(fn).toHaveBeenCalledOnce()
    expect(result).toBe("done")

    expect(await promise1).toBe("debounced")
  })

  it("passes arguments to the original function", async () => {
    const fn = vi.fn((a: number, b: number) => a + b)
    const debounced = debounce(fn, 100)

    const promise = debounced(3, 7)
    await vi.advanceTimersByTimeAsync(100)

    const result = await promise
    expect(result).toBe(10)
    expect(fn).toHaveBeenCalledWith(3, 7)
  })

  it("only executes the last call when called multiple times", async () => {
    const fn = vi.fn((x: string) => x)
    const debounced = debounce(fn, 100)

    const p1 = debounced("first").catch((e) => e)
    const p2 = debounced("second").catch((e) => e)
    const p3 = debounced("third")

    await vi.advanceTimersByTimeAsync(100)

    const result = await p3
    expect(result).toBe("third")
    expect(fn).toHaveBeenCalledOnce()

    expect(await p1).toBe("debounced")
    expect(await p2).toBe("debounced")
  })

  it("cancel rejects the pending promise", async () => {
    const fn = vi.fn(() => "value")
    const debounced = debounce(fn, 300)

    const promise = debounced()
    debounced.cancel()

    await expect(promise).rejects.toBe("debounced")
    expect(fn).not.toHaveBeenCalled()
  })

  it("cancel is safe to call when nothing is pending", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    expect(() => debounced.cancel()).not.toThrow()
  })

  it("works after cancel is called", async () => {
    const fn = vi.fn(() => "after cancel")
    const debounced = debounce(fn, 100)

    const cancelled = debounced().catch((e) => e)
    debounced.cancel()
    expect(await cancelled).toBe("debounced")

    const promise = debounced()
    await vi.advanceTimersByTimeAsync(100)

    const result = await promise
    expect(result).toBe("after cancel")
    expect(fn).toHaveBeenCalledOnce()
  })
})
