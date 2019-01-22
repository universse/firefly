import React, { useState, useEffect, useContext } from 'react'
import { navigate } from 'gatsby'
import { css } from '@emotion/core'

import FirebaseContext from '../contexts/FirebaseContext'
import LocalStorage from '../constants/LocalStorage'
import AuthErrors from '../constants/AuthErrors'

export default function WelcomePage () {
  const [message, setMessage] = useState('')

  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    if (firebase.auth.isSignInWithEmailLink(window.location.href)) {
      const email =
        window.localStorage.getItem(LocalStorage.EMAIL_SIGN_IN) ||
        window.prompt('Please provide your email for confirmation')

      firebase
        .signInWithEmailLink(email)
        .then(() => {
          setMessage('Welcome')
          window.localStorage.removeItem(LocalStorage.EMAIL_SIGN_IN)
        })
        .catch(
          ({ code }) =>
            (code === AuthErrors.EXPIRED_ACTION_CODE ||
              code === AuthErrors.INVALID_ACTION_CODE) &&
            setMessage('Invalid/Expired URL')
        )
        .finally(() => setTimeout(() => navigate('/'), 2000))
    }
  }, [])
  // TODO
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
