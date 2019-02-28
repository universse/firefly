import React from 'react'
import { css } from '@emotion/core'

export function CTA (props) {
  return (
    <button
      css={theme => css`
        background-color: ${theme.colors.brand500};
        border-radius: 1.5rem;
        color: #fff;
        font-size: 0.9375rem;
        font-weight: 700;
        height: 3rem;
        padding: 0 4rem;

        &:hover {
          background-color: ${theme.colors.brand900};
        }
      `}
      type='button'
      {...props}
    />
  )
}
