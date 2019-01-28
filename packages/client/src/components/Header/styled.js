import React from 'react'
import { css } from '@emotion/core'

import { baseWrapper } from '../../styles'

export function HeaderTag ({ boxShadow, translateY, ...props }) {
  return (
    <header
      css={css`
        background-color: rgba(255, 255, 255, 0.95);
        height: 4rem;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 500;
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
