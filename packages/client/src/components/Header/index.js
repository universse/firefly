import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import SearchBar from 'components/SearchBar'
import Navigation from 'components/Navigation'
import { ActionBar } from 'components/common'
import { Logo } from 'icons'
import {
  HeaderTag,
  HeaderWrapper,
  Input,
  Item,
  Result,
  ResultBox,
  Root
} from './styled'
import useMedia from 'hooks/useMedia'
import { media } from 'constants/Theme'

export default function Header ({ location: { pathname } }) {
  const isDesktop = useMedia(media.desktop)

  return (
    isDesktop && (
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
  )
}

export function MobileHeader ({ actions, navIcon, title }) {
  const isNonDesktop = useMedia(media.nonDesktop)

  return (
    isNonDesktop && (
      <HeaderTag>
        <HeaderWrapper>
          <div
            css={css`
              align-items: center;
              display: flex;
            `}
          >
            {navIcon && (
              <div
                css={css`
                  margin: 0 1.5rem 0 -0.5rem;
                `}
              >
                {navIcon}
              </div>
            )}
            <div>
              <h2
                css={theme => css`
                  color: ${theme.colors.gray700};
                  font-size: 1.25rem;
                  font-weight: 600;
                  line-height: 1.5rem;
                `}
              >
                {title}
              </h2>
            </div>
          </div>
          {actions && <ActionBar>{actions}</ActionBar>}
        </HeaderWrapper>
      </HeaderTag>
    )
  )
}
