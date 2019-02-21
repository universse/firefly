import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { createCollectionPath } from '../../../gatsby/utils'

export const collectionHeightInRem = 9

export function CollectionTitle ({ id, name }) {
  return (
    <Link
      css={theme => css`
        display: block;
        height: 100%;
        padding: 1.5rem 0.75rem 0;

        ${theme.screens.tablet} {
          padding: 1.75rem 0.75rem 0;
        }

        ${theme.screens.desktop} {
          padding: 1.75rem 1.75rem 0;
        }
      `}
      to={createCollectionPath({ id, name })}
    >
      <h3
        css={theme => css`
          color: ${theme.colors.gray700};
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.5rem;

          ${theme.screens.nonMobile} {
            font-size: 1.5rem;
            line-height: 2rem;
          }
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
        padding: 0.5rem 1rem 0.25rem;

        ${theme.screens.tablet} {
          padding: 0.75rem 1rem 0.25rem;
        }

        ${theme.screens.desktop} {
          padding: 0.75rem 2rem 0.25rem;
        }
      `}
      {...props}
    />
  )
}
