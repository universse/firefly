import { useReducer, useContext, useEffect, useCallback } from 'react'
import produce from 'immer'
import localforage from 'localforage'

import { AuthenticationContext } from 'contexts/Authentication'
import { FirebaseContext } from 'contexts/Firebase'
import { ModalContext } from 'contexts/Modal'
import useOfflinePersistence from './useOfflinePersistence'
import ModalTypes from 'constants/ModalTypes'
import { logClickAction } from 'utils/amplitudeUtils'
import { hasSignedIn } from 'utils/localStorageUtils'

function reducer (_, { type, payload }) {
  return produce(_, draft => {
    switch (type) {
      case 'load':
        return payload || {}

      case 'click':
        if (draft[payload.id]) {
          delete draft[payload.id]
        } else {
          draft[payload.id] = true
        }

        break
    }
  })
}

export default function useSavedItemsReducer (key, authenticationIsRequired) {
  const [savedItems, dispatch] = useReducer(
    reducer,
    authenticationIsRequired && {}
  )
  const user = useContext(AuthenticationContext)
  const { openModal } = useContext(ModalContext)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    if (!authenticationIsRequired) {
      localforage
        .getItem(key)
        .then(value => dispatch({ type: 'load', payload: value }))
    }
  }, [authenticationIsRequired, key])

  useOfflinePersistence(key, !authenticationIsRequired && savedItems)

  const onClick = useCallback(e => {
    const id = e.currentTarget.value

    if (authenticationIsRequired) {
      if (hasSignedIn() || user) {
        dispatch({
          type: 'click',
          payload: {
            id
          }
        })
      } else {
        openModal(ModalTypes.SIGN_UP_FORM)
      }
    } else {
      dispatch({
        type: 'click',
        payload: {
          id
        }
      })
    }

    logClickAction({
      id,
      action: e.currentTarget.textContent
    })
  }, [authenticationIsRequired, openModal, user])

  return [savedItems, onClick]
}
