import React from 'react'
import { css } from '@emotion/core'

export function DefaultItem ({ isHighlighted, ...props }) {
  return <li {...props} />
}

export function DefaultResultBox (props) {
  return (
    <div
      css={css`
        margin-top: 0.5rem;
      `}
      {...props}
    />
  )
}

export function DefaultRoot ({ innerRef, ...props }) {
  return <div ref={innerRef} {...props} />
}
