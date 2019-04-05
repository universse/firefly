import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react'
import PropTypes from 'prop-types'

import Snackbar from 'components/Snackbar'

export const SetSnackbarContext = createContext()

export default function SetSnackbar ({ children }) {
  const [snackbar, setSnackbar] = useState({ isOpen: false })

  const dismissSnackbar = useCallback(
    () => setSnackbar(snackbar => ({ ...snackbar, isOpen: false })),
    []
  )

  const openSnackbar = useCallback(
    snackbar => setSnackbar({ timeout: 4000, isOpen: true, ...snackbar }),
    []
  )

  useEffect(() => {
    if (snackbar.isOpen && snackbar.timeout) {
      const timeout = setTimeout(dismissSnackbar, snackbar.timeout)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dismissSnackbar, snackbar])

  const value = useMemo(() => ({ dismissSnackbar, openSnackbar }), [
    dismissSnackbar,
    openSnackbar
  ])

  return (
    <SetSnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        dismissSnackbar={dismissSnackbar}
        setSnackbar={setSnackbar}
        snackbar={snackbar}
      />
    </SetSnackbarContext.Provider>
  )
}

SetSnackbar.propTypes = {
  children: PropTypes.node.isRequired
}
