import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Filters from './Filters'
import { ScrollButton } from './styled'
import useSlider from './useSlider'
import { useMedia } from 'hooks/useGlobalStore'
import { screens } from 'constants/Styles'

export default function CategoryFilter ({ pathname }) {
  const {
    isMaxScroll,
    isMinScroll,
    onScroll,
    onScrollLeftClick,
    onScrollRightClick,
    slider
  } = useSlider()

  const { isDesktop } = useMedia()

  return (
    <>
      <div
        css={css`
          margin-bottom: 0.75rem;

          ${screens.nonDesktop} {
            display: none;
          }
        `}
      >
        <span
          css={css`
            color: var(--black600);
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
      <Filters handleScroll={onScroll} pathname={pathname} slider={slider} />
      {isDesktop === false && (
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            pointer-events: none;
            position: absolute;
            top: 0;
            width: 100%;
          `}
        >
          <ScrollButton
            handleClick={onScrollLeftClick}
            isVisible={!isMinScroll}
            side='left'
          />
          <ScrollButton
            handleClick={onScrollRightClick}
            isVisible={!isMaxScroll}
            side='right'
          />
        </div>
      )}
    </>
  )
}

CategoryFilter.propTypes = {
  pathname: PropTypes.string.isRequired
}
