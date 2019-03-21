import React from 'react'
import { css } from '@emotion/core'

import { MobileNavLink } from './styled'
import { Home, Search, Library, User } from 'icons'
import isIndexPage from 'utils/isIndexPage'
import { mobileNavigationHeightInRem } from 'utils/styles'

export default function MobileNavigation ({ location: { pathname } }) {
  return (
    <nav
      css={theme => css`
        background-color: ${theme.colors.white};
        border-top: 1px solid ${theme.colors.gray300};
        bottom: 0;
        height: ${mobileNavigationHeightInRem}rem;
        position: fixed;
        width: 100%;
        z-index: 500;

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
            isActive={isIndexPage(pathname)}
            Icon={Home}
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
            isActive={pathname === '/search'}
            Icon={Search}
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
            isActive={pathname === '/my-library'}
            Icon={Library}
            label='My Library'
            to='/my-library'
          />
        </li>
        <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink
            isActive={pathname === '/me'}
            Icon={User}
            label='Profile'
            to='/me'
          />
        </li>
      </ul>
    </nav>
  )
}