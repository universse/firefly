import React from 'react'
import { css } from '@emotion/core'

import { baseWrapper } from 'utils/styles'

export function HeaderTag (props) {
  return (
    <header
      css={theme => css`
        background-color: ${theme.colors.white};
        height: 4rem;

        ${theme.screens.desktop} {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 500;
        }
      `}
      {...props}
    />
  )
}

export function Wrapper (props) {
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: space-between;
        ${baseWrapper}
      `}
      {...props}
    />
  )
}
