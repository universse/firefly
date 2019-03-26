import React, { useContext, useCallback } from 'react'
import { css } from '@emotion/core'

import { IconButton } from 'components/common'
import { SnackbarContext } from 'contexts/Modal'
import { Message, ActionButton } from './styled'
import { Cross } from 'icons'

export default function Snackbar () {
  const { snackbar, setSnackbar } = useContext(SnackbarContext)

  const dismissSnackbar = useCallback(() => setSnackbar(null), [setSnackbar])

  const { ariaLabel, handleClick, label, message } = snackbar

  return (
    <div
      aria-live='polite'
      className={`Snackbar Snackbar${snackbar ? '--open' : ''}`}
      role='status'
    >
      <div
        css={theme => css`
          background-color: ${theme.colors.gray600};
          height: 3rem;
          max-width: 40rem;
          min-width: 22.5rem;
        `}
      >
        <div>
          <Message>{message}</Message>
        </div>
        <div>
          <ActionButton aria-label={ariaLabel} onClick={handleClick}>
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
    </div>
  )
}
