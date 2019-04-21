import { useReducer, useContext } from 'react'
import produce from 'immer'

import { AuthenticationContext } from 'contexts/Authentication'
import { FirebaseContext } from 'contexts/Firebase'
import useActionClickHandler from './useActionClickHandler'
import useFetchUserData from './useFetchUserData'
import useOfflinePersistence from './useOfflinePersistence'
import useSaveUserData from './useSaveUserData'
import useSyncOfflineData from 'hooks/useSyncOfflineData'
import useTrackToggleStateChange from './useTrackToggleStateChange'

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
