import React from 'react'
import { css } from '@emotion/core'

export function Count ({ isActive, ...props }) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.gray600};
        font-size: 1rem;
        font-weight: ${isActive ? 700 : 400};
      `}
      {...props}
    />
  )
}

export function Tag ({ isActive, ...props }) {
  return (
    // eslint-disable-next-line
    <a
      css={theme => css`
        border-bottom: 2px solid transparent;
        color: ${theme.colors.gray900};
        display: block;
        font-size: 1rem;
        font-weight: ${isActive ? 700 : 400};

        &:hover {
          border-bottom: 2px solid
            ${isActive ? theme.colors.gray900 : theme.colors.brand500};
          color: ${isActive ? theme.colors.gray900 : theme.colors.brand500};
        }
      `}
      {...props}
    />
  )
}
