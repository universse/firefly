import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Location } from '@reach/router'
import { Categories } from 'common'

import { Category } from './styled'
import { RefType } from 'constants/Types'
import { screens } from 'constants/Styles'
import { getNormalizedPathname } from 'utils/pathnameUtils'
import { createCategoryPath } from '../../../gatsby/utils'

function Filters ({ handleScroll, pathname, slider }) {
  const normalizedPathname = getNormalizedPathname(pathname)

  return (
    <nav>
      <div
        css={css`
          position: relative;

          ${screens.nonDesktop} {
            height: 3rem;
            overflow: hidden;
          }
        `}
      >
        <ul
          ref={slider}
          css={css`
            ${screens.nonDesktop} {
              display: flex;
              overflow-x: auto;
            }
          `}
          onScroll={handleScroll}
        >
          <li
            css={css`
              flex: 1 0 auto;

              ${screens.desktop} {
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
              css={css`
                flex: 1 0 auto;

                ${screens.desktop} {
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

export default props => {
  return (
    <Location>
      {({ location }) => <Filters pathname={location.pathname} {...props} />}
    </Location>
  )
}

Filters.propTypes = {
  handleScroll: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  slider: RefType
}
