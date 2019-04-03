import { useEffect } from 'react'
import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

export default function useOfflineQueue (change) {
  useEffect(() => {
    if (!navigator.onLine && change) {
      localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(queue => {
        localforage.setItem(
          LocalStorage.OFFLINE_QUEUE,
          queue ? queue.concat(change) : [change]
        )
      })
    }
  }, [change])
}
