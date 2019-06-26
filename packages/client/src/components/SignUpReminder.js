import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { PrimaryButton } from 'components/common'
import { SetModalContext } from 'contexts/SetModal'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'

export default function SignUpReminder () {
  const setActiveModalType = useContext(SetModalContext)

  return (
    <div
      css={css`
        align-items: center;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
      `}
    >
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
          Please Sign In or Register to Continue
        </h3>
      </div>
      <div>
        <PrimaryButton
          aria-label={AriaLabels.SIGNIN_REGISTER}
          onClick={() => setActiveModalType(ModalTypes.SIGN_UP_FORM)}
        >
          Sign In / Register
        </PrimaryButton>
      </div>
    </div>
  )
}
