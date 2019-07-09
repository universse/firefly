import React from 'react'

import { css } from '@emotion/core'

import { screens } from 'constants/Styles'

export const collectionHeightInRem = 9

export function CollectionWrapper (props) {
  return (
    <div
      css={css`
        border-bottom: 1px solid var(--black300);
        display: flex;
        flex-direction: column;
        height: ${collectionHeightInRem}rem;
        justify-content: space-between;
        margin: 0 1rem;
        padding: 0.5rem 0 0.25rem;

        ${screens.desktop} {
          margin: 0 2rem;
          padding: 0.75rem 0 0.25rem;
        }
      `}
      {...props}
    />
  )
}
