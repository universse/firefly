import { useReducer, useContext, useCallback } from 'react'
import produce from 'immer'

import { AuthenticationContext } from 'contexts/Authentication'
import { FirebaseContext } from 'contexts/Firebase'
import { SnackbarContext } from 'contexts/Snackbar'
import useFetchUserData from './useFetchUserData'
import useOfflinePersistence from './useOfflinePersistence'
import useSaveUserData from './useSaveUserData'
import useTrackToggleStateChange from './useTrackToggleStateChange'
import LocalStorage from 'constants/LocalStorage'
import PopupTypes from 'constants/PopupTypes'
import { logClickAction } from 'utils/amplitudeUtils'
import { hasSignedIn } from 'utils/localStorageUtils'

function getActionKey (action) {
  return action.startsWith('un') ? action.slice(2) : action
}

function reducer (_, { type, payload }) {
  return produce(_, draft => {
    switch (type) {
      case 'load':
        return payload

      case 'click':
        const { action, id } = payload

        if (draft[action][id]) {
          delete draft[action][id]
        } else {
          draft[action][id] = true
        }

        break
    }
  })
}

const initialUserData = {
  check: {},
  love: {},
  save: {}
}

export default function useUserData () {
  const [userData, dispatch] = useReducer(reducer, initialUserData)
  const user = useContext(AuthenticationContext)
  // const [, setSnackbar] = useContext(SnackbarContext)
  const firebase = useContext(FirebaseContext)

  useFetchUserData(dispatch, firebase, user)

  useOfflinePersistence(
    userData !== initialUserData && {
      [LocalStorage.COMPLETED_ITEMS]: userData.check,
      [LocalStorage.SAVED_COLLECTIONS]: userData.save
    }
  )

  const [change, trackChange] = useTrackToggleStateChange()

  useSaveUserData(change, firebase, user)

  const onClick = useCallback(e => {
    const id = e.currentTarget.value
    const action = e.currentTarget.textContent

    const payload = {
      id,
      action: getActionKey(action)
    }

    if (action.endsWith('love')) {
      if (hasSignedIn() || user) {
        dispatch({
          type: 'click',
          payload
        })
      } else {
        // setSnackbar(PopupTypes.SIGN_UP_FORM)
      }
    } else {
      dispatch({
        type: 'click',
        payload
      })
    }
    trackChange(payload)
    logClickAction({ id, action })
  }, [trackChange, user])

  return [userData, onClick]
}
