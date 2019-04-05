import { useContext, useEffect } from 'react'

import { SetSnackbarContext } from 'contexts/SetSnackbar'

export default function useCloseSnackbar () {
  const { dismissSnackbar } = useContext(SetSnackbarContext)

  useEffect(() => {
    dismissSnackbar()
  }, [dismissSnackbar])
}
