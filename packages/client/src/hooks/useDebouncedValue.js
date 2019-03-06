import { useState, useEffect } from 'react'

export default function useDebouncedValue (value, ms) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), ms)

    return () => {
      clearTimeout(timeout)
    }
  }, [ms, value])

  return debouncedValue
}
