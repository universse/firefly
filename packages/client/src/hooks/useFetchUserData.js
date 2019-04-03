import { useEffect } from 'react'
import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

export default function useFetchUserData (dispatch, firebase, user) {
  useEffect(() => {
    Promise.all([
      localforage.getItem(LocalStorage.COMPLETED_ITEMS),
      localforage.getItem(LocalStorage.SAVED_COLLECTIONS)
    ]).then(([check, save]) =>
      dispatch({
        type: 'load',
        payload: { check: check || {}, save: save || {}, love: {} }
      })
    )

    // if (user) {
    //   firebase.fetchUserData().then(onLoad)
    // }
  }, [dispatch, firebase, user])
}
