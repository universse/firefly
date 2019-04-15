import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { MobileNavLink } from './styled'
import { Home, Search, Library, User } from 'icons'
import { mobileNavigationHeightInRem } from 'constants/Styles'
import { isIndexPage } from '../../../gatsby/utils'

export default function MobileNavigation ({ normalizedPathname }) {
  return (
    <nav
      css={theme => css`
        background-color: #fff;
        border-top: 1px solid ${theme.colors.gray300};
        bottom: 0;
        height: ${mobileNavigationHeightInRem}rem;
        position: fixed;
        width: 100%;
        z-index: 200;

        ${theme.screens.desktop} {
          display: none;
        }
      `}
    >
      <ul
        css={css`
          align-items: center;
          display: flex;
          height: 100%;
        `}
      >
        <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink
            Icon={Home}
            isActive={isIndexPage(normalizedPathname)}
            label='Home'
            to='/'
          />
        </li>
        <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink
            Icon={Search}
            isActive={normalizedPathname === '/search'}
            label='Search'
            to='/search'
          />
        </li>
        <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink
            Icon={Library}
            isActive={normalizedPathname === '/my-library'}
            label='My Library'
            to='/my-library'
          />
        </li>
        {/* <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink
            Icon={User}
            isActive={normalizedPathname === '/me'}
            label='Profile'
            to='/me'
          />
        </li> */}
      </ul>
    </nav>
  )
}

MobileNavigation.propTypes = {
  normalizedPathname: PropTypes.string.isRequired
}
