import React from 'react'
import { css } from '@emotion/core'

import { IconButton } from 'components/common'
import { ActionButton, Message, Surface, Wrapper } from './styled'
import { Cross } from 'icons'

export default function Snackbar ({ setSnackbar, snackbar }) {
  const { buttonProps, message } = snackbar || { buttonProps: {} }

  return (
    <Wrapper isOpen={!!snackbar}>
      <Surface
        onMouseEnter={() =>
          setSnackbar(snackbar => snackbar && { ...snackbar, timeout: null })
        }
        onMouseLeave={() =>
          setSnackbar(snackbar => snackbar && { ...snackbar, timeout: 3000 })
        }
      >
        <div
          css={css`
            margin-right: 0.5rem;
          `}
        >
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
            <ActionButton onActionClick={setSnackbar} {...buttonProps} />
          </div>
          <div>
            <IconButton
              aria-label='Dismiss Message'
              light
              onClick={() => setSnackbar()}
            >
              <Cross />
            </IconButton>
          </div>
        </div>
      </Surface>
    </Wrapper>
  )
}
