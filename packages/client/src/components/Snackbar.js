import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Cross } from 'assets/icons'

function Snackbar ({
  dismissSnackbar,
  setSnackbar,
  buttonProps,
  isOpen,
  message
}) {
  return (
    <div
      aria-hidden={!isOpen}
      className={isOpen ? 'Snackbar active' : 'Snackbar'}
    >
      <div
        onMouseEnter={() =>
          setSnackbar(snackbar => ({ ...snackbar, timeout: null }))
        }
        onMouseLeave={() =>
          setSnackbar(snackbar => ({ ...snackbar, timeout: 2000 }))
        }
      >
        <div aria-live='polite' role='status'>
          <span>{message}</span>
        </div>
        <div>
          {buttonProps && (
            <div>
              <button
                {...buttonProps}
                className='ActionButton'
                onClick={e => {
                  dismissSnackbar()
                  buttonProps.onClick(e)
                }}
                type='button'
              />
            </div>
          )}
          <div>
            <button
              aria-label='Dismiss Message'
              className='IconButton light'
              onClick={dismissSnackbar}
              type='button'
            >
              <Cross />
            </button>
          </div>
        </div>
      </div>
    </div>
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
