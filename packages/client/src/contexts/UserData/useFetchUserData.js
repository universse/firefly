import { useEffect } from 'react'

import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'

export default function useFetchUserData (dispatch, user) {
  useEffect(() => {
    offlineStorageWorker
      .loadUserData()
      .then(([check, save]) =>
        dispatch({
          type: 'load-local',
          payload: { check: check || {}, love: {}, save: save || {} }
        })
      )
      .catch(() =>
        dispatch({
          type: 'load-local'
        })
      )
  }, [dispatch])

  useEffect(() => {
    user &&
      firebaseWorker
        .fetchUserData()
        .then(userData =>
          dispatch({ type: 'load-database', payload: userData })
        )
  }, [dispatch, user])
}
