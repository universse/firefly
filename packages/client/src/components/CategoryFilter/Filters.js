import React, { useEffect, useContext, memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Categories, animate } from '@firefly/core'

import { Category, scrollButtonWidthInRem } from './styled'
import { MediaContext } from 'contexts/Media'
import { RefType } from 'constants/Types'
import { baseFontSize, screens } from 'constants/Styles'
import { getNormalizedPathname } from 'utils/pathnameUtils'
import { createCategoryPath } from '../../../gatsby/utils'

const scrollButtonWidthInPx = baseFontSize * scrollButtonWidthInRem
const CategoryPaths = ['/', ...Categories.map((_, i) => createCategoryPath(i))]

function Filters ({ handleScroll, pathname, slider }) {
  const { isDesktop } = useContext(MediaContext)

  useEffect(() => {
    if (isDesktop) return

    const {
      left: sliderLeft,
      right: sliderRight
    } = slider.current.getBoundingClientRect()

    const i = CategoryPaths.indexOf(getNormalizedPathname(pathname))

    const { left, right } = slider.current.children[i].getBoundingClientRect()

    left < scrollButtonWidthInPx &&
      animate({
        element: slider.current,
        prop: 'scrollLeft',
        to:
          slider.current.scrollLeft + left - sliderLeft - scrollButtonWidthInPx
      })

    right > window.innerWidth - scrollButtonWidthInPx &&
      animate({
        element: slider.current,
        prop: 'scrollLeft',
        to:
          slider.current.scrollLeft +
          right -
          sliderRight +
          scrollButtonWidthInPx
      })
  }, [isDesktop, pathname, slider])

  return (
    <nav>
      <div
        css={css`
          position: relative;

          ${screens.nonDesktop} {
            height: 3rem;
            overflow: hidden;

            ul {
              display: flex;
              height: 4.5rem;
              overflow-x: auto;
            }

            li {
              flex: 1 0 auto;
            }
          }

          ${screens.desktop} {
            li {
              margin-bottom: 0.5rem;
            }
          }
        `}
      >
        <ul ref={slider} onScroll={handleScroll}>
          {CategoryPaths.map((path, i) => (
            <li key={i}>
              <Category partiallyActive={path !== '/'} to={CategoryPaths[i]}>
                {Categories[i - 1] || 'all'}
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
  pathname: PropTypes.string,
  slider: RefType
}
