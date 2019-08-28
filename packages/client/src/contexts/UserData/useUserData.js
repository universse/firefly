import { useReducer } from 'react'
import produce from 'immer'

import useActionClickHandler from './useActionClickHandler'
import useFetchUserData from './useFetchUserData'
import useSaveUserData from './useSaveUserData'
import useSyncOfflineData from './useSyncOfflineData'
import useTrackToggleStateChange from './useTrackToggleStateChange'
import { useUser } from 'hooks/useGlobalStore'
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

      case 'load-database': {
        const { check, love, save } = payload

        draft.check = { ...check, ...draft.check }
        draft.love = { ...love, ...draft.love }

        // avoid changing order in my-library page
        Object.keys(save).forEach(id => {
          draft.save[id] = save[id]
        })
        break
      }

      case 'click': {
        const { action, id } = payload
        const key = action.replace('un', '')

        if (draft[key][id]) {
          if (key === 'save') draft.prevSave = { ...draft[key] }
          delete draft[key][id]
        } else {
          draft[key][id] = true
        }
        break
      }

      case 'undo-unsave':
        draft.save = draft.prevSave
        delete draft.prevSave
        break

      default:
        throw new Error('Unknown action type.')
    }
  })
}

// TODO suspense

export default function useUserData (canUndo) {
  const [userData, dispatch] = useReducer(reducer, null)
  const user = useUser()

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
