import React, { memo } from 'react'
import { css } from '@emotion/core'

import SearchBar from 'components/SearchBar'
import Navigation from 'components/Navigation'
import { Logo } from 'icons'
import {
  ClearSearchWrapper,
  HeaderTag,
  HeaderWrapper,
  Input,
  Item,
  Result,
  ResultBox,
  Root
} from './styled'

function Header () {
  return (
    <HeaderTag
      css={theme => css`
        ${theme.screens.nonDesktop} {
          display: none;
        }
      `}
    >
      <HeaderWrapper>
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <div
            css={css`
              margin-right: 1.5rem;
            `}
          >
            <a
              css={css`
                display: block;
                height: 2.25rem;
              `}
              href='/'
            >
              <Logo />
            </a>
          </div>
          <SearchBar
            ClearSearchWrapper={ClearSearchWrapper}
            Input={Input}
            Item={Item}
            Result={Result}
            ResultBox={ResultBox}
            resultCount={10}
            Root={Root}
          />
        </div>
        <Navigation />
      </HeaderWrapper>
    </HeaderTag>
  )
}

export default memo(Header)
