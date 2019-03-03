import { useEffect } from 'react'

export default function useDebounce (fn, ms, deps) {
  useEffect(() => {
    const timeout = setTimeout(fn, ms)

    return () => {
      clearTimeout(timeout)
    }
  }, [deps, fn, ms])
}
