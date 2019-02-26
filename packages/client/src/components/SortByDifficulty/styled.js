import React from 'react'
import { css } from '@emotion/core'

export function Item ({ isHighlighted, ...props }) {
  return (
    <li
      css={theme => css`
        background-color: ${isHighlighted
          ? theme.colors.gray300
          : 'transparent'};
      `}
      {...props}
    />
  )
}

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

export function Root ({ innerRef, ...props }) {
  return (
    <div
      css={css`
        margin-bottom: 0.75rem;
        position: relative;
      `}
      ref={innerRef}
      align='right'
      {...props}
    />
  )
}

export function SortButton ({ isSelected, ...props }) {
  return (
    <button
      css={theme => css`
        color: ${isSelected ? theme.colors.gray700 : theme.colors.gray600};
        font-size: 0.875rem;
        font-weight: ${isSelected ? 600 : 400};
        height: 2.5rem;
        padding-left: 1rem;
        text-align: left;
        text-transform: uppercase;
        width: 13.5rem;
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

export function ToggleButton (props) {
  return (
    <button
      css={theme => css`
        align-items: center;
        color: ${theme.colors.gray700};
        display: flex;
        font-size: 0.875rem;
        font-weight: 600;
        justify-content: space-between;
        padding-left: 1rem;
      `}
      {...props}
    />
  )
}

export function TogglerLabel (props) {
  return (
    <label
      css={css`
        line-height: 1.5rem;
        padding-right: 0.5rem;
      `}
      {...props}
    />
  )
}

export function TogglerValue (props) {
  return (
    <span
      css={css`
        display: inline-block;
        text-align: left;
        text-transform: uppercase;
        width: 11rem;
      `}
      {...props}
    />
  )
}
