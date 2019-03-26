import React, { createContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

export const SnackbarContext = createContext()

export default function Snackbar ({ children }) {
  const [snackbar, setSnackbar] = useState()

  useEffect(() => {
    if (snackbar) {
      const dismissOnEscape = e =>
        (e.key === 'Esc' || e.key === 'Escape') && setSnackbar(null)

      window.addEventListener('keydown', dismissOnEscape)

      return () => {
        window.removeEventListener('keydown', dismissOnEscape)
      }
    }
  }, [snackbar])

  const value = useMemo(
    () => ({
      snackbar,
      setSnackbar
    }),
    [snackbar]
  )

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  )
}

Snackbar.propTypes = {
  children: PropTypes.node.isRequired
}
