import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { ModalContext } from 'components/ModalProvider'
import FirebaseContext from 'contexts/FirebaseContext'
import { AuthButton } from './styled'

export default function SocialLogin ({
  signUpState: { loading, socialLogin },
  setSignUpState
}) {
  const firebase = useContext(FirebaseContext)
  const { handleModalClose } = useContext(ModalContext)

  const handleError = error => {
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        setSignUpState({ loading: false, socialLogin: '' })
        break
      default:
        break
    }
  }

  const handleGoogleSignIn = () => {
    setSignUpState({ loading: true, socialLogin: 'google' })

    firebase
      .signInWithGoogle()
      .then(handleModalClose)
      .catch(handleError)
  }

  // TODO: facebook
  const handleFacebookSignIn = () => {
    setSignUpState({ loading: true, socialLogin: 'facebook' })

    firebase
      .signInWithFacebook()
      .then(handleModalClose)
      .catch(handleError)
  }
  // TODO spinner for loading state
  return (
    <>
      <div
        css={css`
          margin-top: 0.75rem;
        `}
      >
        <AuthButton backgroundColor='#4285f4' onClick={handleGoogleSignIn}>
          {loading && socialLogin === 'google'
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
          {loading && socialLogin === 'facebook'
            ? 'Loading'
            : 'Countinue with Facebook'}
        </AuthButton>
      </div>
    </>
  )
}
