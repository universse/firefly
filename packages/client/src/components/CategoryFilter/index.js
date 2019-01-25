import React from 'react'
import { css } from '@emotion/core'

import { Category } from './styled'
import { Categories } from '../../constants'

export default function CategoryFilter () {
  return (
    <div
      css={css`
        width: 30%;
        padding-top: 2rem;
      `}
    >
      <div
        css={css`
          margin-bottom: 1rem;
        `}
      >
        <span
          css={theme =>
            css`
              color: ${theme.colors.gray500};
              display: block;
              font-size: 0.875rem;
              font-weight: 700;
              line-height: 1.25rem;
              padding-left: calc(1rem + 4px);
            `
          }
        >
          CATEGORIES
        </span>
      </div>
      <nav>
        <ul>
          {Categories.map(({ category, to }) => (
            <li key={category}>
              <Category category={category} to={to} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
