import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Snackbar from 'components/Snackbar'

export const SetSnackbarContext = createContext()

export default function SetSnackbar ({ children }) {
  const [snackbar, setSnackbar] = useState()

  useEffect(() => {
    if (snackbar && snackbar.timeout) {
      const timeout = setTimeout(setSnackbar, snackbar.timeout)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [snackbar])

  return (
    <SetSnackbarContext.Provider value={setSnackbar}>
      {children}
      <Snackbar setSnackbar={setSnackbar} snackbar={snackbar} />
    </SetSnackbarContext.Provider>
  )
}

SetSnackbar.propTypes = {
  children: PropTypes.node.isRequired
}
