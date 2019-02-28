import React, { useState, useContext } from 'react'
import { css } from '@emotion/core'

import FirebaseContext from 'contexts/FirebaseContext'
import LocalStorage from 'constants/LocalStorage'
import { AuthButton, ErrorMessage, Input } from './styled'

export default function EmailLogin ({ inputRef, setSignUpState }) {
  const [email, setEmail] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const firebase = useContext(FirebaseContext)

  const handleChange = e => {
    setIsErrorShown(false)
    setEmail(e.target.value)
  }
  const handleFocus = e => setIsErrorShown(false)
  const handleSubmit = e => {
    e.preventDefault()

    setSignUpState({ loading: true })

    firebase
      .sendSignInLinkToEmail(email)
      .then(() => {
        setSignUpState({ loading: false, email })
        window.localStorage.setItem(LocalStorage.EMAIL_SIGN_IN, email)
      })
      .catch(() => setIsErrorShown(true))
  }

  // spinner icon to button
  return (
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
          Let's Get Started
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          aria-label='Your Email Address'
          name='email'
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder='username@domain.com'
          inputRef={inputRef}
          value={email}
        />
        {isErrorShown && (
          <div>
            <ErrorMessage>Please enter a valid email address</ErrorMessage>
          </div>
        )}
        <div
          css={css`
            margin-top: 1rem;
          `}
        >
          <AuthButton type='submit'>Continue</AuthButton>
        </div>
      </form>
    </>
  )
}
