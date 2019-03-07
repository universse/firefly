import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { NavLink } from './styled'
import { Home, Search, Library } from 'icons'
import { FirebaseContext } from 'contexts/Firebase'
import { ModalContext } from 'contexts/Modal'
import { hasSignedIn } from 'utils/localStorageUtils'
import isIndexPage from 'utils/isIndexPage'
import { mobileNavigationHeightInRem } from 'utils/styles'

function AuthNav () {
  const { openModal } = useContext(ModalContext)
  const firebase = useContext(FirebaseContext)

  // return hasSignedIn() ? (
  //   <li
  //     css={css`
  //       margin-left: 1.5rem;
  //     `}
  //   >
  //     <GhostButton
  //       onClick={() =>
  //         firebase.signOut().then(() => {
  //           window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
  //           window.location.reload()
  //         })
  //       }
  //     >
  //       Log Out
  //     </GhostButton>
  //   </li>
  // ) : (
  //   <>
  //     <li
  //       css={css`
  //         margin-left: 1.5rem;
  //       `}
  //     >
  //       <GhostButton onClick={() => openModal('signUpForm')}>
  //         Sign In
  //       </GhostButton>
  //     </li>
  //     <li
  //       css={css`
  //         margin-left: 1rem;
  //       `}
  //     >
  //       <PrimaryButton onClick={() => openModal('signUpForm')}>
  //         Register
  //       </PrimaryButton>
  //     </li>
  //   </>
  // )
}

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
          <NavLink
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
          <NavLink
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
          <NavLink
            isActive={pathname === '/me'}
            Icon={Library}
            label='My Library'
            to='/me'
          />
        </li>
      </ul>
    </nav>
  )
}
