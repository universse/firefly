import React from 'react'
import { css } from '@emotion/core'

import { ChevronDown } from 'icons'

export function Label (props) {
  return (
    <label
      css={theme => css`
        color: ${theme.colors.gray900};
        font-size: 1rem;
        text-transform: capitalize;
      `}
      {...props}
    />
  )
}

export function OptionList (props) {
  return (
    <ul
      css={theme => css`
        background-color: white;
        border-radius: 8px;
        box-shadow: ${theme.shadows[1]};
        margin-top: 0.25rem;
        position: absolute;
        right: 0;
        z-index: 2;
      `}
      {...props}
    />
  )
}

export function OptionButton ({ isHighlighted, isSelected, ...props }) {
  return (
    <button
      css={theme => css`
        background-color: ${isHighlighted
      ? theme.colors.gray300
      : 'transparent'};
        color: ${isSelected ? theme.colors.gray700 : theme.colors.gray600};
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

export function SortOption (props) {
  return (
    <input
      css={css`
        margin-left: 0;
        margin-right: 1rem;
      `}
      name='sort'
      type='radio'
      {...props}
    />
  )
}

export function ToggleButton ({ children, ...props }) {
  return (
    <button
      css={theme => css`
        align-items: center;
        border-left: 4px solid transparent;
        color: ${theme.colors.gray700};
        display: flex;
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
        css={theme =>
          css`
            color: ${theme.colors.gray500};
            height: 1.5rem;
          `
        }
      >
        <ChevronDown />
      </div>
    </button>
  )
}

export function TogglerLabel (props) {
  return (
    <label
      css={theme => css`
        color: ${theme.colors.gray900};
        font-size: 1rem;
        line-height: 1.5rem;
      `}
      {...props}
    />
  )
}
