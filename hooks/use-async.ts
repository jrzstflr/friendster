import { useState, useCallback, useEffect } from 'react'

interface UseAsyncActionResult<T> {
  isLoading: boolean
  error: Error | null
  execute: () => Promise<T>
}

export function useAsyncAction<T>(
  action: () => Promise<T>,
  onSuccess?: (result: T) => void,
  onError?: (error: Error) => void
): UseAsyncActionResult<T> {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await action()
      onSuccess?.(result)
      return result
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e))
      setError(error)
      onError?.(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [action, onSuccess, onError])

  return { isLoading, error, execute }
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}