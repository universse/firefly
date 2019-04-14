import React, {
  createContext,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback
} from 'react'
import PropTypes from 'prop-types'

import Snackbar from 'components/Snackbar'

export const SetSnackbarContext = createContext()

export default function SetSnackbar ({ children, location }) {
  const [snackbar, setSnackbar] = useState({ isOpen: false })

  const openSnackbar = useCallback(
    snackbar => setSnackbar({ timeout: 4000, isOpen: true, ...snackbar }),
    []
  )

  const dismissSnackbar = useCallback(
    () =>
      setSnackbar(snackbar =>
        snackbar.isOpen ? { ...snackbar, isOpen: false } : snackbar
      ),
    []
  )

  useLayoutEffect(() => {
    dismissSnackbar()
  }, [dismissSnackbar, location])

  useEffect(() => {
    if (snackbar.isOpen && snackbar.timeout) {
      const timeout = setTimeout(dismissSnackbar, snackbar.timeout)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dismissSnackbar, snackbar])

  return (
    <SetSnackbarContext.Provider value={openSnackbar}>
      {children}
      <Snackbar
        dismissSnackbar={dismissSnackbar}
        setSnackbar={setSnackbar}
        {...snackbar}
      />
    </SetSnackbarContext.Provider>
  )
}

SetSnackbar.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
}
