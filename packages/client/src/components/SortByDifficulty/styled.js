import React from 'react'
import PropTypes from 'prop-types'
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
        background-color: #fff;
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
        color: ${isSelected ? theme.colors.gray900 : theme.colors.gray800};
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

OptionButton.propTypes = {
  isHighlighted: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export function SortOption (props) {
  return (
    <input
      css={css`
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
        color: ${theme.colors.gray800};
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

ToggleButton.propTypes = {
  children: PropTypes.node.isRequired
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
