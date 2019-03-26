import React from 'react'
import { css } from '@emotion/core'

export function ActionButton (props) {
  return (
    <button
      css={theme => css`
        color: ${theme.colors.brand500};
        font-size: 0.875rem;
        font-weight: 600;
      `}
      type='button'
      {...props}
    />
  )
}

export function Message (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.white};
        font-size: 0.875rem;
      `}
      {...props}
    />
  )
}
