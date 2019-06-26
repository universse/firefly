import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { ChevronDown } from 'assets/icons'

export function OptionButton ({ isHighlighted, isSelected, ...props }) {
  return (
    <button
      css={css`
        color: ${isSelected ? 'var(--black800)' : 'var(--black500)'};
        font-size: 0.875rem;
        font-weight: ${isSelected ? 600 : 400};
        height: 2.5rem;
        padding-left: 1rem;
        text-align: left;
        text-transform: uppercase;
        width: 11.5rem;
      `}
      tabIndex='-1'
      type='button'
      {...props}
    />
  )
}

export function ToggleButton ({ children, ...props }) {
  return (
    <button
      css={css`
        align-items: center;
        color: var(--black800);
        display: flex;
        font-size: 0.875rem;
        font-weight: 600;
        justify-content: space-between;
        padding-left: 1rem;
        text-transform: uppercase;
        width: 11.5rem;
      `}
      {...props}
    >
      {children}
      <div
        css={css`
          color: var(--gray600);
          height: 1.5rem;
        `}
      >
        <ChevronDown />
      </div>
    </button>
  )
}

export function TogglerLabel (props) {
  return (
    <label
      css={css`
        color: var(--black900);
        font-size: 1rem;
        line-height: 1.5rem;
      `}
      {...props}
    />
  )
}
