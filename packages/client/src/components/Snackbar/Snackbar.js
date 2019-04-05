import React from 'react'
import { css } from '@emotion/core'

import { IconButton } from 'components/common'
import { ActionButton, Message, Surface, Wrapper } from './styled'
import { Cross } from 'icons'

export default function Snackbar ({ dismissSnackbar, setSnackbar, snackbar }) {
  const { buttonProps, message } = snackbar || { buttonProps: {} }

  return (
    <Wrapper isOpen={snackbar.isOpen}>
      <Surface
        onMouseEnter={() =>
          setSnackbar(snackbar => snackbar && { ...snackbar, timeout: null })
        }
        onMouseLeave={() =>
          setSnackbar(snackbar => snackbar && { ...snackbar, timeout: 2000 })
        }
      >
        <div
          aria-live='polite'
          css={css`
            margin-right: 1rem;
          `}
          role='status'
        >
          <Message>{message}</Message>
        </div>
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <div>
            <ActionButton onActionClick={dismissSnackbar} {...buttonProps} />
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
