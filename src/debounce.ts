/**
 * Delays function execution until after a pause. Returns a Promise that resolves
 * with the original function's return value. Includes a `.cancel()` method.
 *
 * @example
 * ```ts
 * const search = debounce((query: string) => fetchResults(query), 300);
 * const result = await search("hello"); // fires after 300ms of no calls
 * search.cancel(); // cancels pending invocation
 * ```
 */
export function debounce<T extends (...args:  any[]) => any>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  let rejectPrevious: ((reason?: any) => void) | undefined = undefined

  const returnedFn = (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer)
    }

    if (rejectPrevious) {
      rejectPrevious('debounced')
    }

    const promise = new Promise<ReturnType<T>>((resolve, reject) => {
      timer = setTimeout(() => {
        resolve(fn(...args))
        timer = undefined
        rejectPrevious = undefined
      }, delay)

      rejectPrevious = reject
    })

    return promise
  }
  
  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
    }

    if (rejectPrevious) {
      rejectPrevious('debounced')
    }

    timer = undefined
    rejectPrevious = undefined
  }

  returnedFn.cancel = cancel

  return returnedFn
}