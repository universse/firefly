import { useEffect } from 'react'

import { saveChangeToOfflineQueue } from 'utils/userDataUtils'

export default function useSaveUserData (change, firebase, user) {
  useEffect(() => {
    if (change && user) {
      navigator.onLine
        ? firebase
            .action(change)
            .then(({ error }) => error && saveChangeToOfflineQueue(change))
        : saveChangeToOfflineQueue(change)
    }
  }, [change, firebase, user])
}
