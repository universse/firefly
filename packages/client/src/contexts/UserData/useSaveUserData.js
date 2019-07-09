import { useEffect } from 'react'

import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'

export default function useSaveUserData (change, user) {
  useEffect(() => {
    if (change && user) {
      firebaseWorker
        .action(change)
        .catch(
          () =>
            !change.action.endsWith('love') &&
            offlineStorageWorker.saveChangesToQueue(change)
        )
    }
  }, [change, user])
}
