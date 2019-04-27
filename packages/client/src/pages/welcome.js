import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import localforage from 'localforage'

import { FirebaseContext } from 'contexts/Firebase'
import { Spinner } from 'components/common'
import LocalStorage from 'constants/LocalStorage'
import { saveChangeToOfflineQueue } from 'utils/userDataUtils'

export default function WelcomePage () {
  const [message, setMessage] = useState('Signing in...')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    firebase
      .isSignInWithEmailLink(window.location.href)
      .then(
        () =>
          window.localStorage.getItem(LocalStorage.EMAIL_SIGN_IN) ||
          window.prompt('Please enter your email for confirmation.')
      )
      .then(email => firebase.signInWithEmailLink(email, window.location.href))
      .then(isNewUser => {
        window.localStorage.removeItem(LocalStorage.EMAIL_SIGN_IN)
        window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
        window.localStorage.setItem(LocalStorage.IS_NEW_USER, isNewUser)

        return Promise.all([
          localforage.getItem('check'),
          localforage.getItem('save')
        ])
      })
      .then(([check, save]) =>
        saveChangeToOfflineQueue({
          check: check || {},
          save: save || {}
        })
      )
      .then(() => window.location.assign('/'))
      .catch(() => {
        setHasError(true)
        setMessage('Something went wrong. Please try again later!')
        setIsLoading(false)
      })
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
        css={css`
          color: var(--colors-gray900);
          font-size: 1rem;
          font-weight: 500;
          line-height: 2rem;
          text-align: center;
        `}
      >
        {message}
      </span>
      {hasError && (
        <span
          css={css`
            color: var(--colors-gray900);
            font-size: 1rem;
            font-weight: 500;
            line-height: 2rem;
            text-align: center;
          `}
        >
          Go to{' '}
          <Link
            css={css`
              color: var(--colors-brand500);
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
