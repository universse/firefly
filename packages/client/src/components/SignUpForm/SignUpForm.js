import React, { memo, useState, useContext } from 'react'
import { css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'

import { ErrorMessage, Input } from './styled'
import Modal from 'components/Modal'
import { IconButton, PrimaryButton } from 'components/common'
import { Cross } from 'icons'
import { SetModalContext } from 'contexts/SetModal'
import LocalStorage from 'constants/LocalStorage'
import ModalTypes from 'constants/ModalTypes'
import firebaseWorker from 'utils/firebaseWorker'

function SignUpForm () {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const setActiveModalType = useContext(SetModalContext)

  const [email, setEmail] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

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

  return (
    <Modal
      className='SignUpModal'
      contentLabel='Sign Up'
      onCloseModal={() => {
        setEmail('')
        setIsSubmitted(false)
        setIsloading(false)
        setHasError(false)
      }}
      type={ModalTypes.SIGN_UP_FORM}
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
              Welcome to {data.site.siteMetadata.title}
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
        <IconButton
          aria-label='Close Modal'
          onClick={() => {
            setActiveModalType()
            setEmail('')
            setIsSubmitted(false)
            setIsloading(false)
            setHasError(false)
          }}
        >
          <Cross />
        </IconButton>
      </div>
    </Modal>
  )
}

export default memo(SignUpForm)
