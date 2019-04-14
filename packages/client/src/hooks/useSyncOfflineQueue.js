import { useState, useEffect, useCallback } from 'react'
import localforage from 'localforage'

import useInterval from './useInterval'
import LocalStorage from 'constants/LocalStorage'

export default function useSyncOfflineQueue (firebase, user) {
  const [shouldSync, setShouldSync] = useState()

  const startSyncing = useCallback(() => setShouldSync(!!user), [user])
  const stopSyncing = useCallback(() => setShouldSync(false), [])

  useEffect(() => {
    setShouldSync(!!user)

    window.addEventListener('online', startSyncing)
    window.addEventListener('offline', stopSyncing)

    return () => {
      window.removeEventListener('online', startSyncing)
      window.removeEventListener('offline', stopSyncing)
    }
  }, [startSyncing, stopSyncing, user])

  const syncOfflineQueue = useCallback(() => {
    const failure = []

    localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes => {
      if (changes && changes.length) {
        stopSyncing()

        changes
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

            startSyncing()
          })
      }
    })
  }, [firebase, startSyncing, stopSyncing])

  useInterval(syncOfflineQueue, shouldSync ? 5000 : null)
}
