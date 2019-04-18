import { useEffect } from 'react'
import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'
import { isNewUser } from 'utils/localStorageUtils'

export default function useFetchUserData (dispatch, firebase, user) {
  useEffect(() => {
    Promise.all([
      localforage.getItem(LocalStorage.COMPLETED_ITEMS),
      localforage.getItem(LocalStorage.SAVED_COLLECTIONS)
    ]).then(([check, save]) => {
      dispatch({
        type: 'load',
        payload: { check: check || {}, save: save || {}, love: {} }
      })

      if (!user) return

      if (isNewUser()) {
        firebase.uploadOfflineData({ check, save })
      } else {
        firebase.fetchUserData().then(({ error, userData }) => {
          !error && dispatch({ type: 'load', payload: userData })
        })
      }
    })
  }, [dispatch, firebase, user])
}
