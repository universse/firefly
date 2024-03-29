import React, { useState } from 'react'
import { css } from '@emotion/core'
import ReactModal from 'react-modal'

import Icon from 'assets/icons'
import useModal from 'hooks/useModal'
import useSiteMetadata from 'hooks/useSiteMetadata'
import LocalStorage from 'constants/LocalStorage'
import ModalTypes from 'constants/ModalTypes'
import { logClickSignUp } from 'utils/analytics'
import firebaseWorker from 'utils/firebaseWorker'
import { getPath } from 'utils/pathnameUtils'

ReactModal.setAppElement('#___gatsby')

export default function SignUpForm () {
  const { title } = useSiteMetadata()

  const [email, setEmail] = useState('')
  // const [isSubscribing, setIsSubscribing] = useState(true)
  const [isLoading, setIsloading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)

  const modalProps = useModal(ModalTypes.SIGN_UP_FORM, 'Sign Up', () => {
    setEmail('')
    setIsSubmitted(false)
    setIsloading(false)
    setHasError(false)
  })

  const handleSubmit = e => {
    e.preventDefault()
    if (!email) return

    logClickSignUp(email)

    setIsloading(true)

    firebaseWorker
      .invite([email], getPath())
      .then(() => {
        setIsSubmitted(true)
        window.localStorage.setItem(LocalStorage.EMAIL_SIGN_IN, email)
      })
      .catch(() => setHasError(true))
      .finally(() => setIsloading(false))
  }

  return (
    <ReactModal className='Dialog' {...modalProps}>
      {isSubmitted ? (
        <div
          css={css`
            text-align: center;
            width: 20rem;
          `}
        >
          <p>
            Thank you for signing up. To confirm your email address, click on
            the link we've just sent to <strong>{email}</strong>.
          </p>
        </div>
      ) : (
        <>
          <div
            css={css`
              margin-bottom: 1.25rem;
            `}
          >
            <h3>Welcome to {title}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div
              css={css`
                width: 18rem;
              `}
            >
              <input
                aria-label='Your Email Address'
                autoComplete='off'
                className='TextInput'
                name='email'
                onChange={e => {
                  setEmail(e.target.value)
                  setHasError(false)
                }}
                placeholder='username@domain.com'
                type='email'
                value={email}
              />
              {hasError && (
                <div
                  css={css`
                    margin-left: 1rem;
                    margin-top: 0.25rem;
                  `}
                >
                  <span
                    css={css`
                      color: var(--brand500);
                      font-size: 0.875rem;
                      font-weight: 500;
                    `}
                  >
                    Please enter a valid email address
                  </span>
                </div>
              )}
              {/* <div
              css={css`
                align-items: center;
                display: flex;
                margin-top: 0.75rem;
              `}
            >
              <input
                checked={isSubscribing}
                id='subscribe'
                name='sort'
                onChange={() =>
                  setIsSubscribing(isSubscribing => !isSubscribing)
                }
                type='checkbox'
                value={isSubscribing}
              />
              <label htmlFor='subscribe'>
                Subscribe to our newsletters for featured content and upcoming
                features.
              </label>
            </div> */}
              {/* 1.25rem 0 0.75rem */}
              <div
                css={css`
                  margin: 1rem 0 0.75rem;
                `}
              >
                <button
                  aria-label='Continue'
                  className='PrimaryButton'
                  disabled={!email}
                  style={{ padding: 0, width: '100%' }}
                  type='submit'
                >
                  Continue
                </button>
              </div>
              {/* <div>
                <span
                  css={css`
                    color: var(--black900);
                    font-size: 0.8125rem;
                    line-height: 1.25rem;
                  `}
                >
                  By registering for {/^[aeiou]/i.test(title) ? 'an' : 'a'}{' '}
                  {title} account, you agree to our{' '}
                  <a href='/terms' rel='noopener noreferrer' target='_blank'>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href='/privacy' rel='noopener noreferrer' target='_blank'>
                    Privacy Policy
                  </a>
                  .
                </span>
              </div> */}
            </div>
          </form>
        </>
      )}
      {isLoading && (
        <div className='fullscreen' style={{ borderRadius: 8 }}>
          <div className='Spinner' />
        </div>
      )}
      <div
        css={css`
          position: absolute;
          right: 1.5rem;
          top: 1.5rem;
        `}
      >
        <button
          aria-label='Close Modal'
          className='IconButton'
          onClick={modalProps.onRequestClose}
          type='button'
        >
          <Icon icon='cross' />
        </button>
      </div>
    </ReactModal>
  )
}
