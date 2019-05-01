import { useEffect } from 'react'

import firebaseWorker from 'utils/firebaseWorker'
import { saveChangeToOfflineQueue } from 'utils/userDataUtils'

export default function useSaveUserData (change, user) {
  useEffect(() => {
    if (change && user) {
      navigator.onLine
        ? firebaseWorker
            .action(change)
            .catch(() => saveChangeToOfflineQueue(change))
        : saveChangeToOfflineQueue(change)
    }
  }, [change, user])
}
