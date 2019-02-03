import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { createCollectionPath } from '../../../gatsby/utils'

export function CollectionTitle ({ id, name }) {
  return (
    <Link
      css={css`
        display: block;
        height: 100%;
        padding: 3.75rem 2rem 0 2rem;
      `}
      to={createCollectionPath({ id, name })}
    >
      <h3
        css={theme => css`
          color: ${theme.colors.gray700};
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 900;
          line-height: 2rem;
        `}
      >
        {name}
      </h3>
    </Link>
  )
}

export function CollectionWrapper (props) {
  return (
    <div
      css={theme => css`
        border-bottom: 1px solid ${theme.colors.gray400};
        display: flex;
        flex-direction: column;
        height: 12rem;
        justify-content: space-between;
        padding: 2rem;
      `}
      {...props}
    />
  )
}
