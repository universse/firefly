import React from 'react'
import { css } from '@emotion/core'

import { baseWrapper } from '../../styles'

export function HeaderTag ({ translateY, ...props }) {
  return (
    <header
      css={css`
        background-color: #fff;
        position: fixed;
        top: 0;
        height: 3.5rem;
        width: 100%;
        transform: translateY(${translateY});
        transition: transform 0.35s;
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
