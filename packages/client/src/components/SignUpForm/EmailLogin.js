import React, { useState, useContext } from 'react'
import { css } from '@emotion/core'

import { FirebaseContext } from 'contexts/Firebase'
import LocalStorage from 'constants/LocalStorage'
import { AuthButton, ErrorMessage, Input } from './styled'

export default function EmailLogin ({ inputRef, setSignUpState }) {
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)

  const firebase = useContext(FirebaseContext)

  const handleChange = e => {
    setHasError(false)
    setEmail(e.target.value)
  }
  const handleFocus = e => setHasError(false)
  const handleSubmit = e => {
    e.preventDefault()

    setSignUpState({ isLoading: true })

    firebase
      .sendSignInLinkToEmail(email)
      .then(() => {
        setSignUpState({ isLoading: false, email })
        window.localStorage.setItem(LocalStorage.EMAIL_SIGN_IN, email)
      })
      .catch(() => setHasError(true))
  }

  // spinner icon to button
  return (
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
      {hasError && (
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
  )
}
