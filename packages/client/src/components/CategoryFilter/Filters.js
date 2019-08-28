import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Categories, createCategoryPath } from '@firefly/core'

import { Category, scrollButtonWidthInRem } from './styled'
import { useMedia } from 'hooks/useGlobalStore'
import { RefType } from 'constants/Types'
import { baseFontSize, screens } from 'constants/Styles'
import animate from 'utils/animate'
import { getNormalizedPathname } from 'utils/pathnameUtils'

const scrollButtonWidthInPx = baseFontSize * scrollButtonWidthInRem
const CategoryPaths = ['/', ...Categories.map((_, i) => createCategoryPath(i))]

function Filters ({ handleScroll, pathname, slider }) {
  const { isDesktop } = useMedia()

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
