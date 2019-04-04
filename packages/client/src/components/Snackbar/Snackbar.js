import React, { useContext, useCallback } from 'react'
import { css } from '@emotion/core'

import { IconButton } from 'components/common'
import { SnackbarContext } from 'contexts/SnackbarProvider'
import { ActionButton, Message, Surface, Wrapper } from './styled'
import { Cross } from 'icons'

export default function Snackbar () {
  const [snackbar, setSnackbar] = useContext(SnackbarContext)

  const dismissSnackbar = useCallback(() => setSnackbar(), [setSnackbar])

  const {
    button: { ariaLabel, onClick, label },
    message
  } = snackbar || { button: {} }

  return (
    <Wrapper isOpen={!!snackbar}>
      <Surface>
        <div>
          <Message>{message}</Message>
        </div>
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <div
            css={css`
              margin-right: 0.5rem;
            `}
          >
            <ActionButton aria-label={ariaLabel} onClick={onClick}>
              {label}
            </ActionButton>
          </div>
          <div>
            <IconButton
              aria-label='Dismiss Message'
              light
              onClick={dismissSnackbar}
            >
              <Cross />
            </IconButton>
          </div>
        </div>
      </Surface>
    </Wrapper>
  )
}
