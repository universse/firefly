import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'
import { Link, navigate } from 'gatsby'

import { FirebaseContext } from 'contexts/Firebase'
import { Spinner } from 'components/common'
import LocalStorage from 'constants/LocalStorage'
import AuthErrors from 'constants/AuthErrors'

// TODO navigate to homepage on error
export default function WelcomePage () {
  const [message, setMessage] = useState('Signing in...')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const firebase = useContext(FirebaseContext)

  useEffect(() => {
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
                setHasError(true)
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
                window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
                window.localStorage.setItem(LocalStorage.IS_NEW_USER, isNewUser)
                navigate('/')
              }
            })
            .catch(() => {
              setHasError(true)
              setMessage('Something went wrong. Please try again later!')
            })
        } else {
          setHasError(true)
          setMessage('Something went wrong. Please try again later!')
        }
      })
      .finally(() => setIsLoading(false))
  }, [firebase])

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
      {isLoading && (
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          <Spinner />
        </div>
      )}
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
      {hasError && (
        <span
          css={theme => css`
            color: ${theme.colors.gray900};
            font-size: 1rem;
            font-weight: 600;
            line-height: 2rem;
            text-align: center;
          `}
        >
          Go to{' '}
          <Link
            css={theme => css`
              color: ${theme.colors.brand500};
            `}
            to='/'
          >
            home page
          </Link>
          .
        </span>
      )}
    </div>
  )
}
