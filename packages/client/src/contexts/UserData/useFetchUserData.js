import { useEffect } from 'react'
import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

export default function useFetchUserData (dispatch, firebase, user) {
  useEffect(() => {
    Promise.all([
      localforage.getItem(LocalStorage.OFFLINE_QUEUE),
      localforage.getItem(LocalStorage.SYNCING)
    ]).then(([changes, syncing]) =>
      syncing
        ? localforage
            .setItem(LocalStorage.OFFLINE_QUEUE, {
              check: { ...syncing.check, ...changes.check },
              save: { ...syncing.save, ...changes.save }
            })
            .then(() => localforage.removeItem(LocalStorage.SYNCING))
        : !changes &&
          localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
            check: {},
            save: {}
          })
    )
  }, [])

  useEffect(() => {
    Promise.all([
      localforage.getItem('check'),
      localforage.getItem('save')
    ]).then(([check, save]) =>
      dispatch({
        type: 'load-local',
        payload: { check: check || {}, save: save || {}, love: {} }
      })
    )
  }, [dispatch])

  useEffect(() => {
    user &&
      firebase
        .fetchUserData()
        .then(userData =>
          dispatch({ type: 'load-database', payload: userData })
        )
  }, [dispatch, firebase, user])
}
