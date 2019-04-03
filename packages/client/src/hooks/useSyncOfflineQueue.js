import { useEffect } from 'react'
import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

const syncOfflineQueue = () => {
  const success = []

  localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes => {
    const length = changes.length

    changes.reduce((prev, curr, i) => {
      const promise = new Promise((resolve, reject) =>
        setTimeout(() => {
          i % 2 === 0 ? reject(new Error()) : resolve(curr)
        }, i * 500)
      )

      return Promise.resolve(prev).then(() =>
        promise
          .then(value => {
            console.log(value)
            success.push(i)
          })
          .then(
            () =>
              i === length - 1 &&
              console.log(changes.filter((_, i) => !success.includes(i)))
          )
          .catch(() => new Error())
      )
    }, [])
  })
}

export default function useSyncOfflineQueue () {
  useEffect(() => {
    window.addEventListener('online', syncOfflineQueue)

    return () => {
      window.removeEventListener('online', syncOfflineQueue)
    }
  }, [])
}
