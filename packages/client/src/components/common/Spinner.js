import React from 'react'
import { css, keyframes } from '@emotion/core'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export default function Spinner () {
  return (
    <div
      css={theme => css`
        animation: ${spin} 0.6s linear infinite;
        border: 0.25rem solid ${theme.colors.gray300};
        border-radius: 50%;
        border-top: 0.25rem solid ${theme.colors.brand500};
        height: 2rem;
        width: 2rem;
      `}
    />
  )
}
