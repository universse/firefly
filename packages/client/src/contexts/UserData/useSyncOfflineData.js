import { useState, useEffect, useCallback } from 'react'

import useInterval from 'hooks/useInterval'
import LocalStorage from 'constants/LocalStorage'
import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'

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
    offlineStorageWorker.getItem(LocalStorage.OFFLINE_QUEUE).then(changes => {
      if (
        Object.keys(changes.check).length ||
        Object.keys(changes.save).length
      ) {
        stopSyncing()

        offlineStorageWorker.processQueue(changes).then(() =>
          firebaseWorker
            .uploadOfflineData(changes)
            .catch(() => offlineStorageWorker.restoreQueue(changes))
            .finally(() =>
              offlineStorageWorker
                .removeItem(LocalStorage.SYNCING)
                .then(startSyncing)
            )
        )
      }
    })
  }, [startSyncing, stopSyncing])

  useInterval(syncOfflineQueue, shouldSync ? 10000 : null, true)
}
