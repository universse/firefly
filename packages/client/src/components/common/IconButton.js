import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { screens } from 'constants/Styles'

// TODO focus state
export default function IconButton ({ children, light, ...props }) {
  return (
    <button
      css={css`
        color: ${light ? 'var(--colors-white900)' : 'var(--colors-gray500)'};
        height: 3rem;
        width: 2.5rem;
        z-index: 1;
      `}
      type='button'
      {...props}
    >
      <div
        css={css`
          align-items: center;
          border-radius: 50%;
          display: flex;
          height: 2.5rem;
          justify-content: center;
          width: 2.5rem;

          &:focus {
          }

          ${screens.desktop} {
            &:hover {
              background-color: ${light
                ? 'var(--colors-white100)'
                : 'var(--colors-gray300)'};
            }
          }
        `}
      >
        {children}
      </div>
    </button>
  )
}

IconButton.defaultProps = {
  light: false
}

IconButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  light: PropTypes.bool,
  value: PropTypes.string
}
