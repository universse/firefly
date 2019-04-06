import React, { memo, useState, useRef, useContext } from 'react'
import { css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'

import EmailLogin from './EmailLogin'
import Modal from 'components/Modal'
import { IconButton } from 'components/common'
// import SocialLogin from './SocialLogin'
import { Cross } from 'icons'
import { ModalContext } from 'contexts/Modal'
import { SetModalContext } from 'contexts/SetModal'
import ModalTypes from 'constants/ModalTypes'

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

  const [signUpState, setSignUpState] = useState({
    isLoading: false,
    email: '',
    socialLogin: ''
  })

  const activeModalType = useContext(ModalContext)
  const { closeModal } = useContext(SetModalContext)

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
          <EmailLogin setSignUpState={setSignUpState} />
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
      <div
        css={css`
          position: absolute;
          right: 1.5rem;
          top: 1.5rem;
        `}
      >
        <IconButton aria-label='Close Modal' onClick={closeModal}>
          <Cross />
        </IconButton>
      </div>
    </Modal>
  )
}

export default memo(SignUpForm)
