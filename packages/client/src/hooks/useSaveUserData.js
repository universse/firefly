import { useEffect } from 'react'

import { saveChangeToOfflineQueue } from 'utils/userDataUtils'

export default function useSaveUserData (change, firebase, user) {
  useEffect(() => {
    if (!change || !user) return

    if (navigator.onLine) {
      // firebase[change.action](change.id).then(({error}) => {if (error) {}})
    } else {
      saveChangeToOfflineQueue(change)
    }
  }, [change, user])
}
