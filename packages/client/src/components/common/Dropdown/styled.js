import React from 'react'
import { css } from '@emotion/core'

export function DefaultRoot ({ innerRef, ...props }) {
  return (
    <div
      ref={innerRef}
      css={css`
        display: inline-block;
        position: relative;
      `}
      {...props}
    />
  )
}
