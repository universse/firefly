import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { screens } from 'constants/Styles'
import { createCollectionPath } from '../../../gatsby/utils'

export const collectionHeightInRem = 9

export function CollectionTitle ({ id, name }) {
  return (
    <Link
      css={css`
        display: block;
        height: 100%;
        padding: 1.75rem 0.75rem 0;

        ${screens.desktop} {
          padding: 2rem 1.75rem 0;
        }
      `}
      to={createCollectionPath({ id, name })}
    >
      <h3
        css={css`
          color: var(--colors-gray900);
          font-size: 1.125rem;
          font-weight: 500;
          line-height: 1.75rem;
        `}
      >
        {name}
      </h3>
    </Link>
  )
}

CollectionTitle.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export function CollectionWrapper (props) {
  return (
    <div
      css={css`
        border-bottom: 1px solid var(--colors-gray400);
        display: flex;
        flex-direction: column;
        height: ${collectionHeightInRem}rem;
        justify-content: space-between;
        padding: 0.5rem 1rem 0.25rem;

        ${screens.desktop} {
          padding: 0.75rem 2rem 0.25rem;
        }
      `}
      {...props}
    />
  )
}
