import React, { memo, useState, useContext } from 'react'
import { css } from '@emotion/core'
import ReactModal from 'react-modal'

import { ErrorMessage, Input } from './styled'
import { PrimaryButton } from 'components/common'
import { Cross } from 'icons'
import { ModalContext } from 'contexts/Modal'
import { SetModalContext } from 'contexts/SetModal'
import useSiteTitle from 'hooks/useSiteTitle'
import LocalStorage from 'constants/LocalStorage'
import ModalTypes from 'constants/ModalTypes'
import firebaseWorker from 'utils/firebaseWorker'
import { logClickSignUp } from 'utils/amplitudeUtils'

ReactModal.setAppElement('#___gatsby')

// TODO: validation https://verifier.meetchopra.com/
function SignUpForm () {
  const title = useSiteTitle()
  const activeModalType = useContext(ModalContext)
  const setActiveModalType = useContext(SetModalContext)

  const [email, setEmail] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    logClickSignUp(email)

    setIsloading(true)

    firebaseWorker
      .sendSignInLinkToEmail(email)
      .then(() => {
        setIsSubmitted(true)
        window.localStorage.setItem(LocalStorage.EMAIL_SIGN_IN, email)
      })
      .catch(() => setHasError(true))
      .finally(() => setIsloading(false))
  }

  const isOpen = activeModalType === ModalTypes.SIGN_UP_FORM

  return (
    <ReactModal
      className='Modal SignUpModal'
      closeTimeoutMS={280}
      contentLabel='Sign Up'
      isOpen={isOpen}
      onRequestClose={() => {
        setActiveModalType(null)
        setEmail('')
        setIsSubmitted(false)
        setIsloading(false)
        setHasError(false)
      }}
      overlayClassName='Overlay'
      shouldCloseOnOverlayClick
    >
      {isSubmitted ? (
        <div
          css={css`
            text-align: center;
            width: 20rem;
          `}
        >
          <p
            css={css`
              color: var(--colors-gray900);
              font-size: 1rem;
              line-height: 1.5rem;
            `}
          >
            Thank you for signing up. To confirm your email address, click on
            the link we've just sent to <strong>{email}</strong>.
          </p>
        </div>
      ) : (
        <>
          <div
            css={css`
              margin-bottom: 1rem;
            `}
          >
            <h3
              css={css`
                color: var(--colors-gray900);
                font-size: 1.25rem;
                font-weight: 700;
                line-height: 2rem;
              `}
            >
              Welcome to {title}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              aria-label='Your Email Address'
              name='email'
              onChange={e => {
                setEmail(e.target.value)
                setHasError(false)
              }}
              placeholder='username@domain.com'
              value={email}
            />
            {hasError && (
              <div
                css={css`
                  margin-left: 1rem;
                  margin-top: 0.125rem;
                `}
              >
                <ErrorMessage>Please enter a valid email address</ErrorMessage>
              </div>
            )}
            <div
              css={css`
                margin-top: 1rem;
              `}
            >
              <PrimaryButton
                aria-label='Sign In with Email Link'
                type='submit'
                width='18rem'
              >
                Sign In with Email Link
              </PrimaryButton>
            </div>
          </form>
        </>
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
          onClick={() => {
            setActiveModalType(null)
            setEmail('')
            setIsSubmitted(false)
            setIsloading(false)
            setHasError(false)
          }}
          type='button'
        >
          <Cross />
        </button>
      </div>
    </ReactModal>
  )
}

export default memo(SignUpForm)
