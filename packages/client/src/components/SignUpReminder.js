import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { SetModalContext } from 'contexts/SetModal'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { logSignUpIntent } from 'utils/analytics'

export default function SignUpReminder () {
  const setActiveModalType = useContext(SetModalContext)

  return (
    <div className='fullscreen'>
      <div
        css={css`
          margin: 0 0 1rem;
        `}
      >
        <h3
          css={css`
            color: var(--black900);
            font-size: 1.125rem;
            font-weight: 500;
            line-height: 2rem;
            text-align: center;
          `}
        >
          {AriaLabels.SIGNIN_CONTINUE}
        </h3>
      </div>
      <div>
        <button
          aria-label={AriaLabels.SIGNIN_REGISTER}
          className='PrimaryButton'
          onClick={() => {
            setActiveModalType(ModalTypes.SIGN_UP_FORM)
            logSignUpIntent()
          }}
          type='button'
        >
          Sign In / Register
        </button>
      </div>
    </div>
  )
}
