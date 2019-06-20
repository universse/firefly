import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { MobileNavLink } from './styled'
import { Home, Search, Library, User } from 'icons'
import { mobileNavigationHeightInRem, screens } from 'constants/Styles'

function MobileNavigation ({ isIndexPage }) {
  return (
    <nav
      css={css`
        background-color: var(--colors-white900);
        border-top: 1px solid var(--colors-gray200);
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
            onClick={e => isIndexPage && e.preventDefault()}
            partiallyActive={isIndexPage}
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
            label='Search'
            partiallyActive
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
            label='My Library'
            partiallyActive
            to='/my-library'
          />
        </li>
        {/* <li
          css={css`
            flex: 1;
          `}
        >
          <MobileNavLink Icon={User} label='Profile' partiallyActive to='/me' />
        </li> */}
      </ul>
    </nav>
  )
}

export default memo(MobileNavigation)

MobileNavigation.propTypes = {
  isIndexPage: PropTypes.bool.isRequired
}
