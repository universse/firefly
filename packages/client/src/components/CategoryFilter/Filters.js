import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Categories } from 'common'

import { Category } from './styled'
import { RefType } from 'constants/Types'
import { getNormalizedPathname } from 'utils/pathnameUtils'
import { createCategoryPath } from '../../../gatsby/utils'

function Filters ({ handleScroll, slider }) {
  const pathname = window.location.pathname
  const normalizedPathname = getNormalizedPathname(pathname)

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
          ref={slider}
          css={theme => css`
            ${theme.screens.nonDesktop} {
              display: flex;
              overflow-x: auto;
            }
          `}
          onScroll={handleScroll}
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
              isActive={
                pathname === '/' || normalizedPathname === '/category/all'
              }
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
                isActive={normalizedPathname === createCategoryPath(category)}
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

export default memo(Filters)

Filters.propTypes = {
  handleScroll: PropTypes.func.isRequired,
  slider: RefType
}
