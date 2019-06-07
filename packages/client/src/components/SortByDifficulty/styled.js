import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { ChevronDown } from 'icons'

export function ToggleButton ({ children, ...props }) {
  return (
    <summary
      css={css`
        border-left: 4px solid transparent;
        color: var(--colors-gray800);
        font-size: 0.875rem;
        font-weight: 600;
        justify-content: space-between;
        padding-left: calc(1rem - 4px);
        text-transform: uppercase;
        width: 11.5rem;
      `}
      {...props}
    >
      {children}
      <div
        css={css`
          color: var(--colors-gray500);
          height: 1.5rem;
        `}
      >
        <ChevronDown />
      </div>
    </summary>
  )
}

ToggleButton.propTypes = {
  children: PropTypes.node.isRequired
}
