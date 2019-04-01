import { useState, useEffect, useCallback } from 'react'

export default function useNetworkStatus () {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const handleOnline = useCallback(() => {
    setIsOnline(true)
  }, [])

  const handleOffline = useCallback(() => {
    setIsOnline(false)
  }, [])

  useEffect(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [handleOffline, handleOnline])

  return isOnline
}
