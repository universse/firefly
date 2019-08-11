import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import LocalStorage from 'constants/LocalStorage'
import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'

export default function WelcomePage ({ location: { search } }) {
  const [message, setMessage] = useState('Signing in...')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    firebaseWorker
      .isSignInWithEmailLink(window.location.href)
      .then(
        () =>
          window.localStorage.getItem(LocalStorage.EMAIL_SIGN_IN) ||
          window.prompt('Please enter your email for confirmation.')
      )
      .then(email =>
        firebaseWorker.signInWithEmailLink(email, window.location.href)
      )
      .then(isNewUser => {
        window.localStorage.removeItem(LocalStorage.EMAIL_SIGN_IN)
        window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
        window.localStorage.setItem(LocalStorage.IS_NEW_USER, isNewUser)

        return offlineStorageWorker.addToQueue()
      })
      .then(() =>
        window.location.assign(
          decodeURIComponent(new URLSearchParams(search).get('redirect_to'))
        )
      )
      .catch(() => {
        setHasError(true)
        setMessage('Something went wrong. Please try again later!')
        setIsLoading(false)
      })
  }, [search])

  return (
    <div className='fullscreen'>
      {isLoading && (
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          <div className='Spinner' />
        </div>
      )}
      <span
        css={css`
          color: var(--black900);
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
            color: var(--black900);
            font-size: 1rem;
            font-weight: 500;
            line-height: 2rem;
            text-align: center;
          `}
        >
          Go to{' '}
          <Link
            css={css`
              color: var(--brand500);

              &:hover {
                text-decoration: underline;
              }
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
