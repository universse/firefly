import React, { useState, useContext } from 'react'
import { css } from '@emotion/core'

import { ModalContext } from '../Modal'
import EmailLogin from './EmailLogin'
import SocialLogin from './SocialLogin'
import { CloseButton } from './styled'

export default function SignUpForm ({ inputRef }) {
  const [signUpState, setSignUpState] = useState({
    loading: false,
    email: '',
    socialLogin: ''
  })
  const { handleModalClose } = useContext(ModalContext)

  // TODO style p
  return !signUpState.loading && signUpState.email ? (
    <>
      <div
        css={css`
          text-align: center;
          width: 18rem;
        `}
      >
        <p>
          Thank you for signing up. To confirm your email, click on the link in
          the email we sent to <strong>{signUpState.email}</strong>.
        </p>
      </div>
      <CloseButton onClick={handleModalClose} />
    </>
  ) : (
    <>
      <EmailLogin inputRef={inputRef} setSignUpState={setSignUpState} />
      <div
        css={css`
          margin-top: 0.75rem;
        `}
      >
        <span
          css={css`
            color: #000;
            font-size: 0.9375rem;
            font-weight: 700;
            line-height: 1.25rem;
          `}
        >
          or
        </span>
      </div>
      <SocialLogin signUpState={signUpState} setSignUpState={setSignUpState} />
      <CloseButton onClick={handleModalClose} />
    </>
  )
}
