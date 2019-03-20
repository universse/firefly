import React, { useContext, memo } from 'react'
import { css } from '@emotion/core'

import Filters from './Filters'
import { ScrollButton } from './styled'
import { Title } from 'components/common'
import { MediaContext } from 'contexts/Media'
import useSlider from 'hooks/useSlider'

export default memo(function CategoryFilter () {
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
      css={theme => css`
        ${theme.screens.desktop} {
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
          <Title>CATEGORIES</Title>
        </div>
      )}
      <Filters handleScroll={onScroll} slider={slider} />
      {!isDesktop && (
        <div>
          <ScrollButton
            display={!isMinScroll}
            handleClick={onScrollLeftClick}
            side='left'
          />
          <ScrollButton
            display={!isMaxScroll}
            handleClick={onScrollRightClick}
            side='right'
          />
        </div>
      )}
    </div>
  )
})
