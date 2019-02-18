import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import SearchBar from 'components/SearchBar'
import Navigation from 'components/Navigation'
import { HeaderWrapper } from 'components/common'
import { Logo } from 'icons'
import { HeaderTag, Input, Item, Result, ResultBox, Root } from './styled'

export default function Header ({ location: { pathname } }) {
  return (
    <HeaderTag>
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
              to='/'
            >
              <Logo />
            </Link>
          </div>
          <SearchBar
            Input={Input}
            Item={Item}
            Result={Result}
            ResultBox={ResultBox}
            Root={Root}
          />
        </div>
        <Navigation />
      </HeaderWrapper>
    </HeaderTag>
  )
}
