import React, { useState, useRef, useContext } from 'react'
import { css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'

import Modal from 'components/Modal'
import EmailLogin from './EmailLogin'
// import SocialLogin from './SocialLogin'
import { CloseButton } from './styled'
import { ModalContext } from 'contexts/Modal'
import ModalTypes from 'constants/ModalTypes'

export default function SignUpForm () {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [signUpState, setSignUpState] = useState({
    isLoading: false,
    email: '',
    socialLogin: ''
  })

  const { activeModalType, focusable, closeModal } = useContext(ModalContext)

  const isOpen = useRef()

  !activeModalType &&
    isOpen.current &&
    setSignUpState({
      isLoading: false,
      email: '',
      socialLogin: ''
    })

  isOpen.current = activeModalType === ModalTypes.SIGN_UP_FORM

  return (
    <Modal
      className='SignUpModal'
      contentLabel='Sign Up'
      type={ModalTypes.SIGN_UP_FORM}
    >
      {!signUpState.isLoading && signUpState.email ? (
        <div
          css={css`
            text-align: center;
            width: 20rem;
          `}
        >
          <p
            css={theme => css`
              color: ${theme.colors.gray900};
              font-size: 1rem;
              line-height: 1.5rem;
            `}
          >
            Thank you for signing up. To confirm your email address, click on
            the link we've just sent to <strong>{signUpState.email}</strong>.
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
              css={theme => css`
                color: ${theme.colors.gray900};
                font-size: 1.25rem;
                font-weight: 700;
                line-height: 2rem;
              `}
            >
              Welcome to {data.site.siteMetadata.title}
            </h3>
          </div>
          <EmailLogin inputRef={focusable} setSignUpState={setSignUpState} />
          {/* <div
            css={css`
              margin-top: 0.75rem;
            `}
          >
            <span
              css={theme => css`
                color: ${theme.colors.gray900};
                font-size: 0.9375rem;
                font-weight: 700;
                line-height: 1.25rem;
              `}
            >
              or
            </span>
          </div>
          <SocialLogin
            signUpState={signUpState}
            setSignUpState={setSignUpState}
          /> */}
        </>
      )}
      <CloseButton onClick={closeModal} />
    </Modal>
  )
}
