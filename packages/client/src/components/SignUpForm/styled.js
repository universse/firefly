import React from 'react'
import { css } from '@emotion/core'

export function ErrorMessage (props) {
  return (
    <span
      css={css`
        color: var(--brand500);
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
        background-color: var(--gray200);
        border-radius: 1.25rem;
        color: var(--black900);
        font-size: 0.9375rem;
        height: 2.5rem;
        padding-left: 1rem;
        width: 18rem;
      `}
      type='email'
      {...props}
    />
  )
}
