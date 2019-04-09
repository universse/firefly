import { useEffect } from 'react'
import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

const saveChangeToOfflineQueue = change =>
  localforage
    .getItem(LocalStorage.OFFLINE_QUEUE)
    .then(queue =>
      localforage.setItem(
        LocalStorage.OFFLINE_QUEUE,
        queue ? queue.concat(change) : [change]
      )
    )

export default function useSaveUserData (change, firebase, user) {
  useEffect(() => {
    if (!change || !user) return

    if (navigator.onLine) {
      // firebase action catch saveChangeToOfflineQueue
    } else {
      saveChangeToOfflineQueue(change)
    }
  }, [change, user])
}