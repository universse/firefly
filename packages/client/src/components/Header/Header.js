import React, { memo } from 'react'
import PropTypes from 'prop-types'
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
  Result,
  ResultBox,
  Root
} from './styled'

function Header ({ normalizedPathname }) {
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
            ClearSearchWrapper={ClearSearchWrapper}
            Input={Input}
            Result={Result}
            ResultBox={ResultBox}
            resultCount={10}
            Root={Root}
          />
        </div>
        <Navigation normalizedPathname={normalizedPathname} />
      </HeaderWrapper>
    </HeaderTag>
  )
}

export default memo(Header)

Header.propTypes = {
  normalizedPathname: PropTypes.string.isRequired
}
