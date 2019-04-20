import { useState, useEffect, useCallback } from 'react'
import localforage from 'localforage'

import useInterval from './useInterval'
import LocalStorage from 'constants/LocalStorage'

export default function useSyncOfflineData (firebase, user) {
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
    localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes => {
      Promise.all([
        localforage.setItem(LocalStorage.SYNCING, changes),
        localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
          check: {},
          save: {}
        })
      ]).then(() => {
        stopSyncing()

        firebase.uploadOfflineData(changes).then(({ error }) => {
          error &&
            localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(newChanges => {
              localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
                check: { ...changes.check, ...newChanges.check },
                save: { ...changes.save, ...newChanges.save }
              })
            })

          localforage.removeItem(LocalStorage.SYNCING).then(startSyncing)
        })
      })
    })
  }, [firebase, startSyncing, stopSyncing])

  useInterval(syncOfflineQueue, shouldSync ? 10000 : null)
}
