import React, { useState, useRef, useContext } from 'react'
import { css } from '@emotion/core'

import Modal from 'components/Modal'
import { ModalContext } from 'components/ModalProvider'
import EmailLogin from './EmailLogin'
import SocialLogin from './SocialLogin'
import { CloseButton } from './styled'
import ModalTypes from 'constants/ModalTypes'

export default function SignUpForm () {
  const [signUpState, setSignUpState] = useState({
    loading: false,
    email: '',
    socialLogin: ''
  })

  const { activeModalType, focusable, handleModalClose } = useContext(
    ModalContext
  )

  const isOpen = useRef()

  !activeModalType &&
    isOpen.current &&
    setSignUpState({
      loading: false,
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
      {!signUpState.loading && signUpState.email ? (
        <>
          <div
            css={css`
              text-align: center;
              width: 18rem;
            `}
          >
            <p
              css={theme => css`
                color: $ ${theme.colors.gray900};
                font-size: 1rem;
                line-height: 1.5 rem;
              `}
            >
              Thank you for signing up. To confirm your email address, click on
              the link we've just sent to <strong>{signUpState.email}</strong>.
            </p>
          </div>
          <CloseButton onClick={handleModalClose} />
        </>
      ) : (
        <>
          <EmailLogin inputRef={focusable} setSignUpState={setSignUpState} />
          <div
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
          />
          <CloseButton onClick={handleModalClose} />
        </>
      )}
    </Modal>
  )
}
