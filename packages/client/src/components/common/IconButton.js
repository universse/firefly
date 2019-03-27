import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

// TODO focus state
export default function IconButton ({ children, light, ...props }) {
  return (
    <button
      css={theme =>
        css`
          color: ${light ? theme.colors.white900 : theme.colors.gray500};
          height: 3rem;
          width: 2.5rem;
          z-index: 1;
        `
      }
      type='button'
      {...props}
    >
      <div
        css={theme => css`
          align-items: center;
          border-radius: 50%;
          display: flex;
          height: 2.5rem;
          justify-content: space-around;
          width: 2.5rem;

          &:focus {
          }

          ${theme.screens.desktop} {
            &:hover {
              background-color: ${light
                ? theme.colors.white100
                : theme.colors.gray300};
            }
          }
        `}
      >
        {children}
      </div>
    </button>
  )
}

IconButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  light: PropTypes.bool,
  value: PropTypes.string
}
