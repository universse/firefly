import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import SearchBar from '../SearchBar'
import Navigation from '../Navigation'
import { Logo } from '../../icons'
import { HeaderTag, Wrapper } from './styled'

export default function Header ({ siteTitle }) {
  return (
    <HeaderTag>
      <Wrapper>
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
          <Location>
            {({ location }) => location.pathname !== '/search' && <SearchBar />}
          </Location>
        </div>
        <Navigation />
      </Wrapper>
    </HeaderTag>
  )
}
