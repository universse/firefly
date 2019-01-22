import React, { useState, useContext } from 'react'
import { css } from '@emotion/core'

import FirebaseContext from '../../contexts/FirebaseContext'
import LocalStorage from '../../constants/LocalStorage'
import { AuthButton } from './styled'

const isValidEmail = email =>
  /^[^@]+@[^@]+$/.test(email) && !/[.]$/.test(email) && !/yopmail/i.test(email)

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

  const border =
    isValidEmail(email) || email === ''
      ? '1px solid rgba(0, 0, 0, 0.5)'
      : '1px solid red'

  // spinner icon to button
  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label='Your Email Address'
        autoComplete='off'
        css={css`
          border: ${border};
          border-radius: 1.25rem;
          color: rgba(0, 0, 0, 0.65);
          font-size: 0.9375rem;
          height: 2.5rem;
          padding-left: 1rem;
          width: 18rem;
        `}
        name='email'
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder='username@domain.com'
        ref={inputRef}
        type='text'
        value={email}
      />
      {isErrorShown && (
        <div>
          <span
            css={css`
              color: red;
              font-size: 0.8125rem;
              font-weight: 600;
            `}
          >
            Please enter a valid email address
          </span>
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
