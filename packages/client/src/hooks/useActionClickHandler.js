import { useCallback, useContext } from 'react'

import { ModalContext } from 'contexts/Modal'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { logClickAction, logSignUpIntent } from 'utils/amplitudeUtils'
import { hasSignedIn } from 'utils/localStorageUtils'

function getActionKey (action) {
  return action.startsWith('un') ? action.slice(2) : action
}

export default function useActionClickHandler (
  canUndo,
  dispatch,
  trackChange,
  user
) {
  const setSnackbar = useContext(SetSnackbarContext)
  const { openModal } = useContext(ModalContext)

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
        setSnackbar({
          buttonProps: {
            'aria-label': 'Undo Removing Collection',
            children: 'Undo',
            onClick: () => {
              dispatch({
                type: 'undo-unsave'
              })
            }
          },
          message: 'Collection removed from library.',
          timeout: 4000
        })
      )
    }

    if (hasSignedIn() || user) {
      if (navigator.onLine) {
        dispatch({
          type: 'click',
          payload
        })
      } else {
        // setSnackbar({
        //   buttonProps: {
        //     'aria-label': 'Retry',
        //     children: 'Retry',
        //     onClick: () => {
        //       dispatch({
        //         type: 'click',
        //         payload
        //       })
        //     }
        //   },
        //   message: 'The Internet connection appears to be offline.'
        // })
      }
    } else {
      // setSnackbar({
      //   buttonProps: {
      //     'aria-label': AriaLabels.SIGNIN_REGISTER,
      //     children: 'Sign In',
      //     onClick: () => {
      //       openModal(ModalTypes.SIGN_UP_FORM)
      //       logSignUpIntent()
      //     }
      //   },
      //   message: 'Please sign in to continue.',
      //   timeout: 4000
      // })
    }
  }, [canUndo, dispatch, setSnackbar, trackChange, user])
}
