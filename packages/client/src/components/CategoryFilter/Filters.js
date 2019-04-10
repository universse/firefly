import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Categories } from 'common'
import { Location } from '@reach/router'

import { URLParamsContext } from 'contexts/URLParams'
import { Category } from './styled'
import { RefType } from 'constants/Types'
import { getNormalizedPathname } from 'utils/pathnameUtils'
import { createCategoryPath } from '../../../gatsby/utils'

const Filters = memo(function ({
  handleScroll,
  onCategoryFilterClick,
  pathname,
  slider
}) {
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
                isActive={normalizedPathname === createCategoryPath(category)}
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
})

export default function (props) {
  const { onCategoryFilterClick } = useContext(URLParamsContext)

  return (
    <Location>
      {({ location }) => (
        <Filters
          onCategoryFilterClick={onCategoryFilterClick}
          pathname={location.pathname}
          {...props}
        />
      )}
    </Location>
  )
}

Filters.propTypes = {
  handleScroll: PropTypes.func.isRequired,
  onCategoryFilterClick: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  slider: RefType
}
