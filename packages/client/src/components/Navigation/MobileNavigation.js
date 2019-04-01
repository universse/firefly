import React from 'react'
import { css } from '@emotion/core'

import { MobileNavLink } from './styled'
import { Home, Search, Library, User } from 'icons'
import { mobileNavigationHeightInRem } from 'constants/Styles'
import { getNormalizedPathname, isIndexPage } from 'utils/pathnameUtils'

export default function MobileNavigation ({ location: { pathname } }) {
  return (
    <nav
      css={theme => css`
        background-color: ${theme.colors.white900};
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
            isActive={isIndexPage(pathname)}
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
            isActive={getNormalizedPathname(pathname) === '/search'}
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
            isActive={getNormalizedPathname(pathname) === '/my-library'}
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
            isActive={getNormalizedPathname(pathname) === '/me'}
            label='Profile'
            to='/me'
          />
        </li> */}
      </ul>
    </nav>
  )
}
