import React from 'react'
import { css } from '@emotion/core'

export function Wrapper (props) {
  return (
    <div
      css={theme => css`
        position: sticky;

        ${theme.screens.nonDesktop} {
          background-color: ${theme.colors.white};
          box-shadow: ${theme.shadows.subtle};
          top: 0;
          z-index: 500;
        }

        ${theme.screens.desktop} {
          align-self: flex-start;
          padding-top: 1rem;
          top: 4rem;
          width: 30%;
        }
      `}
      {...props}
    />
  )
}
