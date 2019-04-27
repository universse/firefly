import React from 'react'
import { css } from '@emotion/core'

export function ErrorMessage (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.brand500};
        font-size: 0.875rem;
        font-weight: 500;
      `}
      {...props}
    />
  )
}

export function Input (props) {
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
          color: ${theme.colors.gray700};
          opacity: 1;
        }

        &:invalid {
          box-shadow: 0 0 0 4px rgba(218, 68, 83, 0.9);
        }
      `}
      type='email'
      {...props}
    />
  )
}
