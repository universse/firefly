import React from 'react'
import { css } from '@emotion/core'

export function ErrorMessage (props) {
  return (
    <span
      css={css`
        color: var(--colors-brand500);
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
      css={css`
        background-color: var(--colors-gray300);
        border-radius: 1.25rem;
        color: var(--colors-gray900);
        font-size: 0.9375rem;
        height: 2.5rem;
        padding-left: 1rem;
        width: 18rem;

        ::placeholder {
          color: var(--colors-gray700);
          opacity: 1;
        }

        &:invalid {
          box-shadow: var(--input-invalid);
        }
      `}
      type='email'
      {...props}
    />
  )
}
