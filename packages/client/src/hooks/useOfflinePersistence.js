import { useEffect } from 'react'
import localforage from 'localforage'

export default function useOfflinePersistence (values) {
  useEffect(() => {
    if (values) {
      Promise.all(
        Object.entries(values).map(([key, value]) =>
          localforage.setItem(key, value)
        )
      )
    }
  }, [values])
}
