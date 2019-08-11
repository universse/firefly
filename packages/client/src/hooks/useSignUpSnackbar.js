import { useContext } from 'react'

import { SetModalContext } from 'contexts/SetModal'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { logSignUpIntent } from 'utils/analytics'

export default function useSignUpSnackbar () {
  const setActiveModalType = useContext(SetModalContext)
  const openSnackbar = useContext(SetSnackbarContext)

  return () => {
    openSnackbar({
      buttonProps: {
        'aria-label': AriaLabels.SIGNIN_REGISTER,
        children: 'Sign In',
        onClick: () => {
          setActiveModalType(ModalTypes.SIGN_UP_FORM)
          logSignUpIntent()
        }
      },
      message: AriaLabels.SIGNIN_CONTINUE
    })
  }
}
