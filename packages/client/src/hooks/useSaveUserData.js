import { useEffect } from 'react'
import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

export default function useSaveUserData (change, firebase, user) {
  useEffect(() => {
    if (!change || !user) return

    if (navigator.onLine) {
    } else {
      localforage
        .getItem(LocalStorage.OFFLINE_QUEUE)
        .then(queue =>
          localforage
            .setItem(
              LocalStorage.OFFLINE_QUEUE,
              queue ? queue.concat(change) : [change]
            )
            .then(console.log)
        )
    }
  }, [change, user])
}
