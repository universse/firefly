import { useState, useEffect, useCallback, useContext } from 'react'
import localforage from 'localforage'

import { FirebaseContext } from 'contexts/Firebase'
import useInterval from './useInterval'
import LocalStorage from 'constants/LocalStorage'

// v2
export default function useSyncOfflineQueue () {
  const firebase = useContext(FirebaseContext)
  const [shouldSync, setShouldSync] = useState(!navigator.onLine)

  const stopSyncing = useCallback(() => setShouldSync(false), [])
  const startSyncing = useCallback(() => setShouldSync(true), [])

  const syncOfflineQueue = useCallback(async () => {
    const success = []

    try {
      const changes = await localforage.getItem(LocalStorage.OFFLINE_QUEUE)

      changes.reduce((prev, curr, i) => {
        const promise = new Promise((resolve, reject) =>
          setTimeout(() => {
            i % 2 === 0 ? reject(new Error()) : resolve(curr)
          }, i * 500)
        )

        return Promise.resolve(prev).then(() =>
          promise
            .then(() => success.concat(i))
            .then(() => {
              if (i === changes.length - 1) {
                const failure = changes.filter((_, i) => !success.includes(i))

                failure.length
                  ? localforage.setItem(
                      LocalStorage.OFFLINE_QUEUE,
                      changes.filter((_, i) => !success.includes(i))
                    )
                  : stopSyncing()
              }
            })
            .catch(() => new Error())
        )
      }, [])
    } catch {}
  }, [stopSyncing])

  useInterval(syncOfflineQueue, shouldSync ? 30000 : null)

  useEffect(() => {
    window.addEventListener('online', startSyncing)
    window.addEventListener('offline', stopSyncing)

    return () => {
      window.removeEventListener('online', startSyncing)
      window.removeEventListener('offline', stopSyncing)
    }
  }, [startSyncing, stopSyncing])

  return startSyncing
}
