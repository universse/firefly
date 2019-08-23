import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import ReactModal from 'react-modal'

import { invite } from './utils'
import useStateStore from './useStateStore'
import Icon from 'assets/icons'
import useModal from 'hooks/useModal'
import ModalTypes from 'constants/ModalTypes'
import { getPath } from 'utils/pathnameUtils'

// multi emails input
export default function InviteModal ({ id }) {
  const authorizedEmails = useStateStore(state => state.authorizedEmails)
  const invitee = useStateStore(state => state.invitee)

  const [emails, setEmails] = useState(authorizedEmails)
  const [email, setEmail] = useState(invitee || '')
  const [name, setName] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)

  const modalProps = useModal(ModalTypes.INVITE, 'Invite Collaborators', () => {
    // reset state
  })

  const handleSubmit = e => {
    e.preventDefault()
    // if (!emails.length) return

    setIsloading(true)

    invite([email], getPath(), id)
      .then(() => setIsSubmitted(true))
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
              margin-bottom: 2rem;
            `}
          >
            <h3>Invite Collaborators</h3>
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
              <div
                css={css`
                  margin: 1rem 0 0.75rem;
                `}
              >
                <button
                  aria-label='Sign In with Email Link'
                  className='PrimaryButton'
                  style={{ padding: 0, width: '100%' }}
                  type='submit'
                >
                  Invite
                </button>
              </div>
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

InviteModal.propTypes = {
  id: PropTypes.string.isRequired
}
