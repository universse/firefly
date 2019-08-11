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

export default function SetSnackbar ({ children, pathname }) {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    shouldPersistOnNavigate: false
  })

  const {
    buttonProps,
    isOpen,
    message,
    // onDismiss,
    shouldPersistOnNavigate
  } = snackbar

  const openSnackbar = useCallback(
    snackbar =>
      setSnackbar({
        timeout: 4000,
        isOpen: true,
        shouldPersistOnNavigate: false,
        ...snackbar
      }),
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
    !shouldPersistOnNavigate && dismissSnackbar()
  }, [dismissSnackbar, pathname, shouldPersistOnNavigate])

  useEffect(() => {
    const { isOpen, timeout } = snackbar

    if (isOpen && timeout) {
      const timeoutId = setTimeout(dismissSnackbar, timeout)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [dismissSnackbar, snackbar])

  // useEffect(() => {
  //   !isOpen && onDismiss && onDismiss()
  // }, [isOpen, onDismiss])

  return (
    <SetSnackbarContext.Provider value={openSnackbar}>
      {children}
      <Snackbar
        buttonProps={buttonProps}
        dismissSnackbar={dismissSnackbar}
        isOpen={isOpen}
        message={message}
        setSnackbar={setSnackbar}
      />
    </SetSnackbarContext.Provider>
  )
}

SetSnackbar.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired
}
