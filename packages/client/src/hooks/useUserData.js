import { useReducer, useContext } from 'react'
import produce from 'immer'

import { AuthenticationContext } from 'contexts/Authentication'
import { FirebaseContext } from 'contexts/Firebase'
import useActionClickHandler from './useActionClickHandler'
import useFetchUserData from './useFetchUserData'
import useOfflinePersistence from './useOfflinePersistence'
import useSaveUserData from './useSaveUserData'
import useSyncOfflineData from './useSyncOfflineData'
import useTrackToggleStateChange from './useTrackToggleStateChange'
import { getActionKey } from 'utils/userDataUtils'

function reducer (_, { type, payload }) {
  return produce(_, draft => {
    switch (type) {
      case 'load-local':
        return (
          payload || {
            check: {},
            love: {},
            save: {}
          }
        )

      case 'load-database':
        Object.keys(payload).forEach(
          key => (draft[key] = { ...payload[key], ...draft[key] })
        )
        break

      case 'click':
        const { action, id } = payload
        const key = getActionKey(action)

        if (draft[key][id]) {
          if (key === 'save') draft.prevSave = { ...draft[key] }
          delete draft[key][id]
        } else {
          draft[key][id] = true
        }
        break

      case 'undo-unsave':
        draft.save = draft.prevSave
        delete draft.prevSave
        break

      default:
        throw new Error('Unknown action type.')
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
    change &&
      !change.action.endsWith('love') && {
        check: userData.check,
        save: userData.save
      }
  )

  useSaveUserData(change, firebase, user)

  useSyncOfflineData(firebase, user)

  const onActionClick = useActionClickHandler(
    canUndo,
    dispatch,
    trackChange,
    user
  )

  return [userData, onActionClick]
}
