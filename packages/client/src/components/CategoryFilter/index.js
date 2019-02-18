import React, { useState, useRef, useCallback } from 'react'
import { css } from '@emotion/core'

import Filters from './Filters'
import { ScrollButton } from './styled'
import { Title } from 'components/common'

export default function CategoryFilter () {
  const scrollByX = 200
  const [isMaxScroll, setIsMaxScroll] = useState(false)
  const [isMinScroll, setIsMinScroll] = useState(true)

  const slider = useRef()

  const onScroll = useCallback(() => {
    setIsMaxScroll(
      slider.current.scrollLeft >=
        slider.current.scrollWidth - slider.current.clientWidth
    )
    setIsMinScroll(slider.current.scrollLeft === 0)
  }, [])

  const onScrollLeftClick = useCallback(e => {
    slider.current.scrollBy({ left: -scrollByX, behavior: 'smooth' })
  }, [])

  const onScrollRightClick = useCallback(e => {
    slider.current.scrollBy({ left: scrollByX, behavior: 'smooth' })
  }, [])

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
