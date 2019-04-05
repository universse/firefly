import { useReducer, useContext } from 'react'
import produce from 'immer'

import { AuthenticationContext } from 'contexts/Authentication'
import { FirebaseContext } from 'contexts/Firebase'
import useActionClickHandler from './useActionClickHandler'
import useFetchUserData from './useFetchUserData'
import useOfflinePersistence from './useOfflinePersistence'
import useSaveUserData from './useSaveUserData'
import useTrackToggleStateChange from './useTrackToggleStateChange'
import LocalStorage from 'constants/LocalStorage'

function reducer (_, { type, payload }) {
  return produce(_, draft => {
    switch (type) {
      case 'load':
        return (
          payload || {
            check: {},
            love: {},
            save: {}
          }
        )

      case 'click':
        const { action, id } = payload

        if (draft[action][id]) {
          if (action === 'save') {
            draft.prevSave = { ...draft['save'] }
          }
          delete draft[action][id]
        } else {
          draft[action][id] = true
        }

        break

      case 'undo-unsave':
        draft.save = draft.prevSave
        draft.prevSave = null
        break
    }
  })
}

export default function useUserData (canUndo) {
  const [userData, dispatch] = useReducer(reducer)
  const user = useContext(AuthenticationContext)
  const firebase = useContext(FirebaseContext)

  useFetchUserData(dispatch, firebase, user)

  const [change, trackChange] = useTrackToggleStateChange()

  useOfflinePersistence(
    change && {
      [LocalStorage.COMPLETED_ITEMS]: userData.check,
      [LocalStorage.SAVED_COLLECTIONS]: userData.save
    }
  )

  useSaveUserData(change, firebase, user)

  const onActionClick = useActionClickHandler(
    canUndo,
    dispatch,
    trackChange,
    user
  )

  return [userData, onActionClick]
}
