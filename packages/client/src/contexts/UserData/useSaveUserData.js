import { useEffect } from 'react'

import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'

export default function useSaveUserData (change, user) {
  useEffect(() => {
    if (change && user) {
      navigator.onLine
        ? firebaseWorker
            .action(change)
            .catch(() => offlineStorageWorker.saveChangesToQueue(change))
        : offlineStorageWorker.saveChangesToQueue(change)
    }
  }, [change, user])
}
