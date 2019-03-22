import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { FirebaseContext } from 'contexts/Firebase'
import LocalStorage from 'constants/LocalStorage'
import AuthErrors from 'constants/AuthErrors'

export default function WelcomePage () {
  const [message, setMessage] = useState('Signing in...')
  const [isLoading, setIsLoading] = useState(true)

  const firebase = useContext(FirebaseContext)

  useEffect(
    () => {
      firebase
        .isSignInWithEmailLink(window.location.href)
        .then(isSignInWithEmailLink => {
          if (isSignInWithEmailLink) {
            const email =
              window.localStorage.getItem(LocalStorage.EMAIL_SIGN_IN) ||
              window.prompt('Please enter your email for confirmation.')

            firebase
              .signInWithEmailLink(email, window.location.href)
              .then(({ error, isNewUser }) => {
                if (error) {
                  setIsLoading(false)

                  const code = error

                  if (
                    code === AuthErrors.EXPIRED_ACTION_CODE ||
                    code === AuthErrors.INVALID_ACTION_CODE
                  ) {
                    setMessage(
                      'Seems like this sign-in link has expired. Please try again later!'
                    )
                  }
                } else {
                  window.localStorage.removeItem(LocalStorage.EMAIL_SIGN_IN)
                  window.localStorage.setItem(
                    LocalStorage.HAS_SIGNED_IN,
                    'true'
                  )
                  window.localStorage.setItem(
                    LocalStorage.IS_NEW_USER,
                    isNewUser
                  )
                  navigate('/')
                }
              })
              .catch(() => {
                setIsLoading(false)
                setMessage('Something went wrong. Please try again later!')
              })
          } else {
            setIsLoading(false)
            setMessage('Something went wrong. Please try again later!')
          }
        })
    },
    [firebase]
  )

  return (
    <div
      css={css`
        align-items: center;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
      `}
    >
      <div
        css={css`
          height: 1.5rem;
          margin: 0 0 1rem;
          width: 1.5rem;
        `}
      >
        {isLoading && 'spinner'}
      </div>
      <div>
        <span
          css={theme => css`
            color: ${theme.colors.gray900};
            font-size: 1rem;
            font-weight: 600;
            line-height: 2rem;
            text-align: center;
          `}
        >
          {message}
        </span>
      </div>
    </div>
  )
}
