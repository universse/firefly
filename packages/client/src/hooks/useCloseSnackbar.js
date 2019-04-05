import { useContext, useEffect } from 'react'

import { SetSnackbarContext } from 'contexts/SetSnackbar'

export default function useCloseSnackbar () {
  const setSnackbar = useContext(SetSnackbarContext)

  useEffect(() => {
    setSnackbar()
  }, [setSnackbar])
}
