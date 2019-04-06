import React, { createContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import Snackbar from 'components/Snackbar'

export const SetSnackbarContext = createContext()

export default function SetSnackbar ({ children }) {
  const [snackbar, setSnackbar] = useState({ isOpen: false })

  const value = useMemo(
    () => ({
      dismissSnackbar () {
        setSnackbar(snackbar => ({ ...snackbar, isOpen: false }))
      },
      openSnackbar (snackbar) {
        setSnackbar({ timeout: 4000, isOpen: true, ...snackbar })
      }
    }),
    []
  )

  useEffect(() => {
    if (snackbar.isOpen && snackbar.timeout) {
      const timeout = setTimeout(value.dismissSnackbar, snackbar.timeout)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [snackbar, value.dismissSnackbar])

  return (
    <SetSnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        dismissSnackbar={value.dismissSnackbar}
        setSnackbar={setSnackbar}
        snackbar={snackbar}
      />
    </SetSnackbarContext.Provider>
  )
}

SetSnackbar.propTypes = {
  children: PropTypes.node.isRequired
}
