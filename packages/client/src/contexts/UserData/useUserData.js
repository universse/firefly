import { useReducer, useContext } from 'react'
import produce from 'immer'

import { AuthenticationContext } from '../Authentication'
import useActionClickHandler from './useActionClickHandler'
import useFetchUserData from './useFetchUserData'
import useSaveUserData from './useSaveUserData'
import useSyncOfflineData from './useSyncOfflineData'
import useTrackToggleStateChange from './useTrackToggleStateChange'
import useOfflinePersistence from 'hooks/useOfflinePersistence'

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
        const { save, ...rest } = payload
        Object.keys(rest).forEach(
          key => (draft[key] = { ...rest[key], ...draft[key] })
        )
        Object.keys(save).forEach(id => {
          draft.save[id] = save[id]
        })
        break

      case 'click':
        const { action, id } = payload
        const key = action.replace('un', '')

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
  const [userData, dispatch] = useReducer(reducer, null)
  const user = useContext(AuthenticationContext)

  useFetchUserData(dispatch, user)

  const [change, trackChange] = useTrackToggleStateChange()

  useOfflinePersistence(
    change &&
      !change.action.endsWith('love') && {
        check: userData.check,
        save: userData.save
      }
  )

  useSaveUserData(change, user)

  useSyncOfflineData(user)

  const onActionClick = useActionClickHandler(
    canUndo,
    dispatch,
    trackChange,
    user
  )

  return [userData, onActionClick]
}
