import React, { createContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

export const SnackbarContext = createContext()

export default function SnackbarProvider ({ children }) {
  const snackbarState = useState()

  const [snackbar, setSnackbar] = snackbarState

  useEffect(() => {
    snackbar && setTimeout(setSnackbar, 3000)
  }, [setSnackbar, snackbar])

  return (
    <SnackbarContext.Provider value={snackbarState}>
      {children}
    </SnackbarContext.Provider>
  )
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired
}
