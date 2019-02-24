import React, { useState, useContext } from 'react'
import { css } from '@emotion/core'

import FirebaseContext from 'contexts/FirebaseContext'
import LocalStorage from 'constants/LocalStorage'
import { AuthButton, ErrorMessage, Input } from './styled'
import { isValidEmail } from './utils'

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

    if (isValidEmail(email)) {
      setSignUpState({ loading: true })

      firebase
        .sendSignInLinkToEmail(email)
        .then(() => {
          setSignUpState({ loading: false, email })
          window.localStorage.setItem(LocalStorage.EMAIL_SIGN_IN, email)
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              setIsErrorShown(true)
              break
            default:
              break
          }
        })
    } else {
      setIsErrorShown(true)
    }
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
      {isErrorShown && (
        <div>
          <ErrorMessage>Please enter a valid email address</ErrorMessage>
        </div>
      )}
      <div
        css={css`
          margin-top: 0.5rem;
        `}
      >
        <AuthButton type='submit'>Continue</AuthButton>
      </div>
    </form>
  )
}
