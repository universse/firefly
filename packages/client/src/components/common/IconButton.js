import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { screens } from 'constants/Styles'

// TODO focus state
export default function IconButton ({
  as: Tag = 'button',
  children,
  light = false,
  ...props
}) {
  return (
    <Tag
      css={css`
        color: ${light ? 'var(--colors-white900)' : 'var(--colors-gray500)'};
        height: 3rem;
        width: 2.5rem;
        z-index: 1;
      `}
      {...Tag === 'button' && { type: 'button' }}
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
    </Tag>
  )
}

IconButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['button', 'summary']),
  light: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string
}
