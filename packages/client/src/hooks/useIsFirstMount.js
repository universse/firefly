import { useEffect, useRef } from 'react'

export default function useIsFirstMount () {
  const isFirstMount = useRef(true)

  useEffect(() => {
    isFirstMount.current && (isFirstMount.current = false)
  }, [])

  return isFirstMount
}
