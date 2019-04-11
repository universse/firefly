import { useState, useEffect, useCallback } from 'react'
import localforage from 'localforage'

import useInterval from './useInterval'
import LocalStorage from 'constants/LocalStorage'

export default function useSyncOfflineQueue (firebase, user) {
  const [shouldSync, setShouldSync] = useState()

  const stopSyncing = useCallback(() => setShouldSync(false), [])

  useEffect(() => {
    setShouldSync(!!user)

    const startSyncing = () => setShouldSync(!!user)

    window.addEventListener('online', startSyncing)
    window.addEventListener('offline', stopSyncing)

    return () => {
      window.removeEventListener('online', startSyncing)
      window.removeEventListener('offline', stopSyncing)
    }
  }, [stopSyncing, user])

  const syncOfflineQueue = useCallback(() => {
    const failure = []

    localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes =>
      changes && changes.length
        ? changes
            .reduce(
              (chain, { id, action }, i) =>
                chain.then(() =>
                  firebase[`${action}`](id).catch(() => failure.push(i))
                ),
              Promise.resolve([])
            )
            .then(() => {
              localforage.setItem(
                LocalStorage.OFFLINE_QUEUE,
                changes.filter((_, i) => failure.includes(i))
              )

              !failure.length && stopSyncing()
            })
        : stopSyncing()
    )
  }, [firebase, stopSyncing])

  useInterval(syncOfflineQueue, shouldSync ? 5000 : null, true)
}
