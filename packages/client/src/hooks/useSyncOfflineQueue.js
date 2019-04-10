import { useState, useEffect, useCallback, useContext } from 'react'
import localforage from 'localforage'

import { FirebaseContext } from 'contexts/Firebase'
import useInterval from './useInterval'
import LocalStorage from 'constants/LocalStorage'

// v2
export default function useSyncOfflineQueue () {
  const firebase = useContext(FirebaseContext)
  const [shouldSync, setShouldSync] = useState(true)

  const stopSyncing = useCallback(() => setShouldSync(false), [])
  const startSyncing = useCallback(() => setShouldSync(true), [])

  const syncOfflineQueue = useCallback(() => {
    const failure = []

    localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes =>
      changes && changes.length
        ? changes
            .reduce((chain, curr, i) => {
              // create firebase action promise
              const promise = new Promise((resolve, reject) =>
                setTimeout(() => resolve(curr), 1)
              )

              return chain.then(() => promise.catch(() => failure.push(i)))
            }, Promise.resolve([]))
            .then(() => {
              localforage.setItem(
                LocalStorage.OFFLINE_QUEUE,
                changes.filter((_, i) => failure.includes(i))
              )

              !failure.length && stopSyncing()
            })
        : stopSyncing()
    )
  }, [stopSyncing])

  useInterval(syncOfflineQueue, shouldSync ? 5000 : null, true)

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
