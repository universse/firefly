import { useState, useEffect, useCallback } from 'react'
import localforage from 'localforage'

import useInterval from 'hooks/useInterval'
import LocalStorage from 'constants/LocalStorage'
import firebaseWorker from 'utils/firebaseWorker'

export default function useSyncOfflineData (user) {
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
      if (
        Object.keys(changes.check).length ||
        Object.keys(changes.save).length
      ) {
        stopSyncing()

        Promise.all([
          localforage.setItem(LocalStorage.SYNCING, changes),
          localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
            check: {},
            save: {}
          })
        ]).then(() =>
          firebaseWorker
            .uploadOfflineData(changes)
            .catch(() =>
              localforage
                .getItem(LocalStorage.OFFLINE_QUEUE)
                .then(newChanges => {
                  localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
                    check: { ...changes.check, ...newChanges.check },
                    save: { ...changes.save, ...newChanges.save }
                  })
                })
            )
            .finally(() =>
              localforage.removeItem(LocalStorage.SYNCING).then(startSyncing)
            )
        )
      }
    })
  }, [startSyncing, stopSyncing])

  useInterval(syncOfflineQueue, shouldSync ? 10000 : null)
}
