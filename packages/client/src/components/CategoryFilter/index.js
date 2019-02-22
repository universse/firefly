import React from 'react'
import { css } from '@emotion/core'

import Filters from './Filters'
import { ScrollButton } from './styled'
import { Title } from 'components/common'
import useSlider from 'hooks/useSlider'

export default function CategoryFilter () {
  const {
    isMaxScroll,
    isMinScroll,
    onScroll,
    onScrollLeftClick,
    onScrollRightClick,
    slider
  } = useSlider()

  return (
    <div
      css={theme => css`
        ${theme.screens.desktop} {
          margin-bottom: 2rem;
        }
      `}
    >
      <div
        css={theme => css`
          margin-bottom: 0.75rem;

          ${theme.screens.nonDesktop} {
            display: none;
          }
        `}
      >
        <Title>CATEGORIES</Title>
      </div>

      <Filters handleScroll={onScroll} slider={slider} />
      <div
        css={theme => css`
          ${theme.screens.desktop} {
            display: none;
          }
        `}
      >
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
    </div>
  )
}
