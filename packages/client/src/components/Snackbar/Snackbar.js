import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { IconButton } from 'components/common'
import { ActionButton, Message, Surface, Wrapper } from './styled'
import { Cross } from 'icons'

export default function Snackbar ({
  dismissSnackbar,
  setSnackbar,
  snackbar: { buttonProps, isOpen, message }
}) {
  return (
    <Wrapper isOpen={isOpen}>
      <Surface
        onMouseEnter={() =>
          setSnackbar(snackbar => ({ ...snackbar, timeout: null }))
        }
        onMouseLeave={() =>
          setSnackbar(snackbar => ({ ...snackbar, timeout: 2000 }))
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

Snackbar.propTypes = {
  dismissSnackbar: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
  snackbar: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    buttonProps: PropTypes.exact({
      'aria-label': PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired
    }),
    message: PropTypes.string
  }).isRequired
}
