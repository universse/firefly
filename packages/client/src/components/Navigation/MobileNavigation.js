import React from 'react'
import { css } from '@emotion/core'

import { MobileNavLink } from './styled'
import { Home, Search, Library, User } from 'icons'
import { mobileNavigationHeightInRem, screens } from 'constants/Styles'
import { isIndexPage } from '../../../gatsby/utils'

export default function MobileNavigation () {
  return (
    <nav
      css={css`
        background-color: #fff;
        border-top: 1px solid var(--colors-gray300);
        bottom: 0;
        height: ${mobileNavigationHeightInRem}rem;
        position: fixed;
        width: 100%;
        z-index: 200;

        ${screens.desktop} {
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
            label='Home'
            onClick={e => {
              isIndexPage() && e.preventDefault()
            }}
            partiallyActive={isIndexPage()}
            to='/'
          />
        </li>
        <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink Icon={Search} label='Search' to='/search' />
        </li>
        <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink Icon={Library} label='My Library' to='/my-library' />
        </li>
        {/* <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink Icon={User} label='Profile' to='/me' />
        </li> */}
      </ul>
    </nav>
  )
}
