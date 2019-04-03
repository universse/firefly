import React, { createContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

export const SnackbarContext = createContext()

export default function Snackbar ({ children }) {
  const snackbarState = useState()

  const [snackbar, setSnackbar] = snackbarState

  useEffect(() => {
    const dismissOnEscape = e =>
      (e.key === 'Esc' || e.key === 'Escape') && setSnackbar(null)

    window.addEventListener('keydown', dismissOnEscape)

    return () => {
      window.removeEventListener('keydown', dismissOnEscape)
    }
  }, [setSnackbar, snackbar])

  return (
    <SnackbarContext.Provider value={snackbarState}>
      {children}
    </SnackbarContext.Provider>
  )
}

Snackbar.propTypes = {
  children: PropTypes.node.isRequired
}
