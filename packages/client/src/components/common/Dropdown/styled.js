import React from 'react'
import { css } from '@emotion/core'

export function DefaultRoot ({ innerRef, ...props }) {
  return (
    <div
      css={css`
        display: inline-block;
        position: relative;
      `}
      ref={innerRef}
      {...props}
    />
  )
}
