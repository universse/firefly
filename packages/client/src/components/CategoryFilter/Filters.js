import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { Categories } from 'common'
import { URLUtilsContext } from 'contexts/URLUtils'
import { Category } from './styled'
import withLocation from 'utils/withLocation'
import { createCategoryPath } from '../../../gatsby/utils'

function Filters ({ handleScroll, location: { pathname }, slider }) {
  const { onCategoryFilterClick } = useContext(URLUtilsContext)

  return (
    <nav>
      <div
        css={theme => css`
          position: relative;

          ${theme.screens.nonDesktop} {
            height: 3rem;
            overflow: hidden;
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
            css={theme => css`
              flex: 1 0 auto;

              ${theme.screens.desktop} {
                margin: 0.125rem 0;
              }
            `}
          >
            <Category
              isActive={pathname === '/' || pathname === '/category/all'}
              onClick={onCategoryFilterClick}
              to='/category/all'
            >
              all
            </Category>
          </li>
          {Categories.map(category => (
            <li
              key={category}
              css={theme => css`
                flex: 1 0 auto;

                ${theme.screens.desktop} {
                  margin: 0.125rem 0;
                }
              `}
            >
              <Category
                isActive={pathname === createCategoryPath(category)}
                onClick={onCategoryFilterClick}
                to={createCategoryPath(category)}
              >
                {category}
              </Category>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default withLocation(Filters)
