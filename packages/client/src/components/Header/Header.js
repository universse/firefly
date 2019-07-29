import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { HeaderTag, HeaderWrapper } from './styled'
import Navigation from 'components/Navigation'
import SearchComboBox from 'components/SearchComboBox'
import { Logo } from 'assets/icons'

export default function Header ({ noSearch }) {
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
          {!noSearch && <SearchComboBox maxResultCount={7} />}
        </div>
        <Navigation />
      </HeaderWrapper>
    </HeaderTag>
  )
}

Header.propTypes = {
  noSearch: PropTypes.bool.isRequired
}
