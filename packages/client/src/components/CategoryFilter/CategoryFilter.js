import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Filters from './Filters'
import { ScrollButton } from './styled'
import useSlider from './useSlider'
import { MediaContext } from 'contexts/Media'
import { screens } from 'constants/Styles'

export default function CategoryFilter ({ location }) {
  const {
    isMaxScroll,
    isMinScroll,
    onScroll,
    onScrollLeftClick,
    onScrollRightClick,
    slider
  } = useSlider()

  const isDesktop = useContext(MediaContext)

  return (
    <div
      css={css`
        ${screens.desktop} {
          margin-bottom: 2rem;
        }
      `}
    >
      {isDesktop && (
        <div
          css={css`
            margin-bottom: 0.75rem;
          `}
        >
          <span
            css={css`
              color: var(--colors-gray600);
              display: block;
              font-size: 0.875rem;
              font-weight: 600;
              line-height: 1.5rem;
              padding-left: calc(1rem + 4px);
            `}
          >
            CATEGORIES
          </span>
        </div>
      )}
      <Filters handleScroll={onScroll} location={location} slider={slider} />
      {!isDesktop && (
        <div>
          <ScrollButton
            handleClick={onScrollLeftClick}
            isShown={!isMinScroll}
            side='left'
          />
          <ScrollButton
            handleClick={onScrollRightClick}
            isShown={!isMaxScroll}
            side='right'
          />
        </div>
      )}
    </div>
  )
}

CategoryFilter.propTypes = {
  location: PropTypes.object
}
