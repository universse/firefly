import { useCallback, useContext } from 'react'

import { SetSnackbarContext } from 'contexts/SetSnackbar'
import useSignUpSnackbar from 'hooks/useSignUpSnackbar'
import { logClickAction } from 'utils/analytics'

export default function useActionClickHandler (
  canUndo,
  dispatch,
  trackChange,
  user
) {
  const openSnackbar = useContext(SetSnackbarContext)
  const signUpSnackbar = useSignUpSnackbar()

  return useCallback(
    (e, cb = () => {}) => {
      const id = e.currentTarget.value
      const action = e.currentTarget.textContent
      const payload = { id, action }
      logClickAction(payload)

      if (!action.endsWith('love')) {
        trackChange(payload)
        dispatch({ type: 'click', payload })

        return (
          canUndo &&
          action === 'unsave' &&
          openSnackbar({
            buttonProps: {
              'aria-label': 'Undo Removing Collection',
              children: 'Undo',
              onClick: () => {
                logClickAction({ id, action: 'undo unsave' })
                trackChange(payload)
                dispatch({
                  type: 'undo-unsave'
                })
              }
            },
            message: 'Removed collection from library.'
          })
        )
      }

      if (user) {
        if (navigator.onLine) {
          trackChange(payload)
          dispatch({
            type: 'click',
            payload
          })
          cb()
        } else {
          openSnackbar({
            message: 'The Internet connection appears to be offline.'
          })
        }
      } else {
        signUpSnackbar()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canUndo, user]
  )
}
