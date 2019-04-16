import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { FirebaseContext } from 'contexts/Firebase'
import { SetModalContext } from 'contexts/SetModal'
import { AuthButton } from './styled'

export default function SocialLogin ({
  signUpState: { isLoading, socialLogin },
  setSignUpState
}) {
  const firebase = useContext(FirebaseContext)
  const setActiveModalType = useContext(SetModalContext)

  const handleError = error => {
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        setSignUpState({ isLoading: false, socialLogin: '' })
        break
      default:
        break
    }
  }

  const handleGoogleSignIn = () => {
    setSignUpState({ isLoading: true, socialLogin: 'google' })

    firebase
      .signInWithGoogle()
      .then(setActiveModalType)
      .catch(handleError)
  }

  // TODO: facebook
  const handleFacebookSignIn = () => {
    setSignUpState({ isLoading: true, socialLogin: 'facebook' })

    firebase
      .signInWithFacebook()
      .then(setActiveModalType)
      .catch(handleError)
  }
  // TODO spinner for isLoading state
  return (
    <>
      <div
        css={css`
          margin-top: 0.75rem;
        `}
      >
        <AuthButton backgroundColor='#4285f4' onClick={handleGoogleSignIn}>
          {isLoading && socialLogin === 'google'
            ? 'Loading'
            : 'Countinue with Google'}
        </AuthButton>
      </div>
      <div
        css={css`
          margin-top: 0.5rem;
        `}
      >
        <AuthButton backgroundColor='#4267b2' onClick={handleFacebookSignIn}>
          {isLoading && socialLogin === 'facebook'
            ? 'Loading'
            : 'Countinue with Facebook'}
        </AuthButton>
      </div>
    </>
  )
}
