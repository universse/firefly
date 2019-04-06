import { useState, useCallback } from 'react'

import useDebouncedValue from './useDebouncedValue'

export default function useTrackToggleStateChange () {
  const [clickCount, setClickCount] = useState(0)
  const [changes, setChanges] = useState()

  const trackChange = useCallback(change => {
    setClickCount(num => num + 1)
    setChanges(change)
  }, [])

  const resetClickCount = useCallback(() => setClickCount(0), [])

  const debouncedClickCount = useDebouncedValue(
    clickCount,
    350,
    resetClickCount
  )

  const change = !clickCount && debouncedClickCount % 2 && changes

  return [change, trackChange]
}
