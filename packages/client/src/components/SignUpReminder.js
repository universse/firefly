import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { PrimaryButton } from 'components/common'
import { ModalContext } from 'contexts/Modal'
import ModalTypes from 'constants/ModalTypes'
import AriaLabels from 'constants/AriaLabels'

export default function SignUpReminder () {
  const { openModal } = useContext(ModalContext)

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
          css={theme => css`
            color: ${theme.colors.gray900};
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 2rem;
            text-align: center;
          `}
        >
          Please Log In or Register to Continue
        </h3>
      </div>
      <div>
        <PrimaryButton
          aria-label={AriaLabels.LOGIN_REGISTER}
          onClick={() => openModal(ModalTypes.SIGN_UP_FORM)}
        >
          Log In / Register
        </PrimaryButton>
      </div>
    </div>
  )
}
