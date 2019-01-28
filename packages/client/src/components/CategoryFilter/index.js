import React from 'react'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import { Category } from './styled'
import Categories from 'constants/Categories'
import { createCategoryPath } from '../../../gatsby/utils'

export default function CategoryFilter () {
  return (
    <div
      css={css`
        display: inline-block;
        padding-top: 2rem;
        position: sticky;
        top: 4rem;
        vertical-align: top;
        width: 30%;
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
          <li>
            <Location>
              {({ location }) => (
                <Category
                  active={location.pathname === '/'}
                  category='all'
                  to='/category/all'
                />
              )}
            </Location>
          </li>
          {Categories.map(category => (
            <li key={category}>
              <Category category={category} to={createCategoryPath(category)} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
