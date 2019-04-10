import React, { memo, useContext } from 'react'
import { Link } from 'gatsby'
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
import { URLParamsContext } from 'contexts/URLParams'

function Header () {
  const { onCategoryFilterClick } = useContext(URLParamsContext)

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
            <Link
              css={css`
                display: block;
                height: 2.25rem;
              `}
              onClick={onCategoryFilterClick}
              to='/'
            >
              <Logo />
            </Link>
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
