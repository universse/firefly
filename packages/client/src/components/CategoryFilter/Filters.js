import React, { memo, useContext } from 'react'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import { Category } from './styled'
import { Categories } from 'common'
import { createCategoryPath } from '../../../gatsby/utils'
import { URLUtilsContext } from 'pages'

function Filters ({ handleScroll, slider }) {
  const { onFilterClick } = useContext(URLUtilsContext)

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
                  isActive={pathname === '/' || pathname === '/category/all'}
                  category='all'
                  handleClick={onFilterClick}
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
                    isActive={pathname === createCategoryPath(category)}
                    category={category}
                    handleClick={onFilterClick}
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
