import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import SearchBar from './SearchBar'
import Navigation from 'components/Navigation'
import { Logo } from 'icons'
import { HeaderTag, HeaderWrapper } from './styled'

function Header ({ isIndexPage }) {
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
          {!isIndexPage && <SearchBar maxResultCount={10} />}
        </div>
        <Navigation />
      </HeaderWrapper>
    </HeaderTag>
  )
}

export default memo(Header)

Header.propTypes = {
  isIndexPage: PropTypes.bool.isRequired
}
