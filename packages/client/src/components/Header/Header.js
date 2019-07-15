import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import SearchComboBox from './SearchComboBox'
import Navigation from 'components/Navigation'
import { Logo } from 'assets/icons'
import { HeaderTag, HeaderWrapper } from './styled'

export default function Header ({ isIndexPage }) {
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
              margin-right: 1.75rem;
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
          {!isIndexPage && <SearchComboBox maxResultCount={7} />}
        </div>
        <Navigation />
      </HeaderWrapper>
    </HeaderTag>
  )
}

Header.propTypes = {
  isIndexPage: PropTypes.bool.isRequired
}
