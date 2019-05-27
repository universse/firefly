import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Categories } from 'common'

import { Category, buttonWidthInRem } from './styled'
import { MediaContext } from 'contexts/Media'
import { RefType } from 'constants/Types'
import { baseFontSize, screens } from 'constants/Styles'
import animate from 'utils/animate'
import { getNormalizedPathname } from 'utils/pathnameUtils'
import { createCategoryPath } from '../../../gatsby/utils'

const buttonWidthInPx = baseFontSize * buttonWidthInRem
const CategoryPaths = [
  '/',
  ...Categories.map(category => createCategoryPath(category))
]

export default function Filters ({ handleScroll, location, slider }) {
  const isDesktop = useContext(MediaContext)

  useEffect(() => {
    if (isDesktop) return

    const {
      left: sliderLeft,
      right: sliderRight
    } = slider.current.getBoundingClientRect()

    const i = CategoryPaths.indexOf(getNormalizedPathname(location.pathname))

    const { left, right } = slider.current.children[i].getBoundingClientRect()

    left < buttonWidthInPx &&
      animate(
        'scrollLeft',
        slider.current,
        slider.current.scrollLeft + left - sliderLeft - buttonWidthInPx
      )

    right > window.innerWidth - buttonWidthInPx &&
      animate(
        'scrollLeft',
        slider.current,
        slider.current.scrollLeft + right - sliderRight + buttonWidthInPx
      )
  }, [isDesktop, location, slider])

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
            <Category to={CategoryPaths[0]}>all</Category>
          </li>
          {Categories.map((category, i) => (
            <li
              key={category}
              css={css`
                flex: 1 0 auto;

                ${screens.desktop} {
                  margin: 0.125rem 0;
                }
              `}
            >
              <Category partiallyActive to={CategoryPaths[i + 1]}>
                {category}
              </Category>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

Filters.propTypes = {
  handleScroll: PropTypes.func.isRequired,
  location: PropTypes.object,
  slider: RefType
}
