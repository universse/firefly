import React, { useCallback, useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'

import FirebaseContext from '../contexts/FirebaseContext'
import LocalStorage from 'constants/LocalStorage'
import AuthErrors from 'constants/AuthErrors'
import FirebaseWorkerEvents from 'constants/FirebaseWorkerEvents'

export default function WelcomePage () {
  const [message, setMessage] = useState('')

  const firebase = useContext(FirebaseContext)

  const handleSignIn = useCallback(e => {
    if (e.data.type === FirebaseWorkerEvents.EMAIL_LINK_SIGN_IN_SUCCESS) {
      setMessage('Welcome')
      window.localStorage.removeItem(LocalStorage.EMAIL_SIGN_IN)
      window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
      window.localStorage.setItem(LocalStorage.IS_NEW_USER, e.data.payload)

      // TODO welcome redirecting to homepage
    } else if (e.data.type === FirebaseWorkerEvents.EMAIL_LINK_SIGN_IN_ERROR) {
      const code = e.data.payload

      if (
        code === AuthErrors.EXPIRED_ACTION_CODE ||
        code === AuthErrors.INVALID_ACTION_CODE
      ) {
        setMessage('Invalid/Expired URL')
      }
    }
  }, [])

  useEffect(() => {
    firebase
      .isSignInWithEmailLink(window.location.href)
      .then(isSignInWithEmailLink => {
        if (isSignInWithEmailLink) {
          const email =
            window.localStorage.getItem(LocalStorage.EMAIL_SIGN_IN) ||
            window.prompt('Please provide your email for confirmation')

          firebase.signInWithEmailLink(email, window.location.href)
        }
      })

    firebase.addEventListener('message', handleSignIn)

    return () => {
      firebase.removeEventListener('message', handleSignIn)
    }
  }, [firebase, handleSignIn])

  return (
    <p
      css={css`
        font-size: 1rem;
      `}
    >
      {message}
    </p>
  )
}
