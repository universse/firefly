import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Categories } from 'common'

import { activeStyle, Category } from './styled'
import { RefType } from 'constants/Types'
import { screens } from 'constants/Styles'
import { createCategoryPath } from '../../../gatsby/utils'

export function Filters ({ handleScroll, slider }) {
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
              getProps={({ location: { pathname }, isPartiallyCurrent }) =>
                isPartiallyCurrent || pathname === '/'
                  ? { style: activeStyle }
                  : null
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
              <Category to={createCategoryPath(category)}>{category}</Category>
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
