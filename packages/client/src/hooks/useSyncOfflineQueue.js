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
    localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes => {
      if (['check', 'save'].some(key => Object.values(changes[key]).length)) {
        localforage.setItem(LocalStorage.OFFLINE_QUEUE, null)
        stopSyncing()

        firebase.uploadOfflineData(changes).then(({ error }) => {
          error &&
            localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(newChanges => {
              localforage
                .setItem(LocalStorage.OFFLINE_QUEUE, {
                  check: { ...changes.check, ...newChanges.check },
                  save: { ...changes.save, ...newChanges.save }
                })
                .then(() => startSyncing())
            })
        })
      }
    })
  }, [firebase, startSyncing, stopSyncing])

  useInterval(syncOfflineQueue, shouldSync ? 10000 : null)
}
