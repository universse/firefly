import React, { memo } from 'react'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import { Category } from './styled'
import { Categories } from 'common'
import { createCategoryPath } from '../../../gatsby/utils'

function Filters ({ slider, handleScroll }) {
  return (
    <nav>
      <div
        css={theme => css`
          position: relative;

          ${theme.screens.nonDesktop} {
            overflow: hidden;
            height: 4rem;
          }
        `}
      >
        <Location>
          {({ location: { pathname } }) => (
            <ul
              css={theme => css`
                ${theme.screens.nonDesktop} {
                  display: flex;
                  overflow-x: auto;
                }
              `}
              onScroll={handleScroll}
              ref={slider}
            >
              <li
                css={css`
                  flex: 1 0 auto;
                `}
              >
                <Category
                  active={pathname === '/' || pathname === '/category/all'}
                  category='all'
                  to='/category/all'
                />
              </li>
              {Categories.map(category => (
                <li
                  key={category}
                  css={css`
                    flex: 1 0 auto;
                  `}
                >
                  <Category
                    active={pathname === createCategoryPath(category)}
                    category={category}
                    to={createCategoryPath(category)}
                  />
                </li>
              ))}
            </ul>
          )}
        </Location>
      </div>
    </nav>
  )
}

export default memo(Filters)
