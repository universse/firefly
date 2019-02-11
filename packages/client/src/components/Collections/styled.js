import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { createCollectionPath } from '../../../gatsby/utils'

export const collectionHeightInRem = 10.5

export function CollectionTitle ({ id, name }) {
  return (
    <Link
      css={css`
        display: block;
        height: 100%;
        padding: 2.25rem 1.75rem 0 1.75rem;
      `}
      to={createCollectionPath({ id, name })}
    >
      <h3
        css={theme => css`
          color: ${theme.colors.gray700};
          font-size: 1.5rem;
          font-weight: 700;
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
        height: ${collectionHeightInRem}rem;
        justify-content: space-between;
        padding: 1rem 2rem;
      `}
      {...props}
    />
  )
}
