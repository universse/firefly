import React from 'react'
import { css } from '@emotion/core'

import { Cross } from '../../icons'

export function AuthButton ({ backgroundColor, ...props }) {
  return (
    <button
      css={theme => css`
        background-color: ${backgroundColor || theme.colors.brand500};
        border-radius: 1.25rem;
        color: #fff;
        font-size: 0.9375rem;
        font-weight: 700;
        height: 2.5rem;
        padding-left: 1rem;
        width: 18rem;
      `}
      type='button'
      {...props}
    />
  )
}

export function CloseButton (props) {
  return (
    <div
      css={css`
        height: 1.5rem;
        width: 1.5rem;
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
      `}
    >
      <button aria-label='Close Modal' type='button' {...props}>
        <Cross />
      </button>
    </div>
  )
}

export function ErrorMessage (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.brand500};
        font-size: 0.875rem;
        font-weight: 600;
      `}
      {...props}
    />
  )
}

export function Input ({ inputRef, ...props }) {
  return (
    <input
      autoComplete='off'
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: 1.25rem;
        color: ${theme.colors.gray900};
        font-size: 0.9375rem;
        height: 2.5rem;
        padding-left: 1rem;
        width: 18rem;

        ::placeholder {
          color: ${theme.colors.gray600};
          opacity: 1;
        }

        &:invalid {
          box-shadow: 0 0 0 4px rgba(218, 68, 83, 0.9);
        }
      `}
      ref={inputRef}
      type='email'
      {...props}
    />
  )
}
