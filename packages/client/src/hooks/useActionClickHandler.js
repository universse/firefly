import { useCallback, useContext } from 'react'

import { SetModalContext } from 'contexts/SetModal'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { logClickAction, logSignUpIntent } from 'utils/amplitudeUtils'

function getActionKey (action) {
  return action.startsWith('un') ? action.slice(2) : action
}

export default function useActionClickHandler (
  canUndo,
  dispatch,
  trackChange,
  user
) {
  const setActiveModalType = useContext(SetModalContext)
  const openSnackbar = useContext(SetSnackbarContext)

  return useCallback(e => {
    const id = e.currentTarget.value
    const action = e.currentTarget.textContent

    const payload = {
      id,
      action: getActionKey(action)
    }

    logClickAction({ id, action })

    if (!action.endsWith('love')) {
      trackChange(payload)

      dispatch({
        type: 'click',
        payload
      })

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
          message: 'Collection removed from library.'
        })
      )
    }

    if (user) {
      if (navigator.onLine) {
        dispatch({
          type: 'click',
          payload
        })
      } else {
        openSnackbar({
          buttonProps: {
            'aria-label': 'Retry',
            children: 'Retry',
            onClick: () => {
              dispatch({
                type: 'click',
                payload
              })
            }
          },
          message: 'The Internet connection appears to be offline.'
        })
      }
    } else {
      openSnackbar({
        buttonProps: {
          'aria-label': AriaLabels.SIGNIN_REGISTER,
          children: 'Sign In',
          onClick: () => {
            setActiveModalType(ModalTypes.SIGN_UP_FORM)
            logSignUpIntent()
          }
        },
        message: 'Please sign in to continue.'
      })
    }
  }, [canUndo, dispatch, openSnackbar, setActiveModalType, trackChange, user])
}
