import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { PrimaryButton } from 'components/common'
import { FirebaseContext } from 'contexts/Firebase'
import LocalStorage from 'constants/LocalStorage'
import { ErrorMessage, Input } from './styled'

export default function EmailLogin ({ setSignUpState }) {
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)

  const firebase = useContext(FirebaseContext)

  const handleChange = e => setEmail(e.target.value)

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

  return (
    <form onSubmit={handleSubmit}>
      <Input
        aria-label='Your Email Address'
        name='email'
        onChange={handleChange}
        placeholder='username@domain.com'
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
        <PrimaryButton
          aria-label='Sign In with Email Link'
          type='submit'
          width='18rem'
        >
          Sign In with Email Link
        </PrimaryButton>
      </div>
    </form>
  )
}

EmailLogin.propTypes = {
  setSignUpState: PropTypes.func.isRequired
}
