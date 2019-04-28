import { useEffect, useRef } from 'react'

export default function useIsFirstMount () {
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
    }
  }, [])

  return isFirstMount.current
}
