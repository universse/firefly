import React, { useContext } from 'react'
import { css } from '@emotion/core'
import { Location } from '@reach/router'
import { Categories } from 'common'

import { Category } from './styled'
import { createCategoryPath } from '../../../gatsby/utils'
import { URLUtilsContext } from 'pages'

function Filters ({ handleScroll, location: { pathname }, slider }) {
  const { onCategoryFilterClick } = useContext(URLUtilsContext)

  return (
    <nav>
      <div
        css={theme => css`
          position: relative;

          ${theme.screens.nonDesktop} {
            overflow: hidden;
            height: 3rem;
          }
        `}
      >
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
              handleClick={onCategoryFilterClick}
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
                handleClick={onCategoryFilterClick}
                to={createCategoryPath(category)}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default function WithLocation (props) {
  return (
    <Location>
      {({ location }) => <Filters location={location} {...props} />}
    </Location>
  )
}
