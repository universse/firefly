import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { IconButton } from 'components/common'
import { ActionButton, Message, Surface, Wrapper } from './styled'
import { Cross } from 'icons'
import { screens } from 'constants/Styles'

function Snackbar ({
  dismissSnackbar,
  setSnackbar,
  buttonProps,
  isOpen,
  message
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

            ${screens.mobile} {
              margin-right: 0;
              padding-top: 0.5rem;
            }
          `}
          role='status'
        >
          <Message>{message}</Message>
        </div>
        <div
          css={css`
            align-items: center;
            display: flex;

            ${screens.mobile} {
              align-self: flex-end;
              margin-right: -0.5rem;
            }
          `}
        >
          {buttonProps && (
            <div>
              <ActionButton onActionClick={dismissSnackbar} {...buttonProps} />
            </div>
          )}
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

export default memo(Snackbar)

Snackbar.propTypes = {
  dismissSnackbar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setSnackbar: PropTypes.func.isRequired,
  buttonProps: PropTypes.exact({
    'aria-label': PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  message: PropTypes.string
}
