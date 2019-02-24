import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

// import { ModalContext } from 'components/ModalProvider'
// import FirebaseContext from 'contexts/FirebaseContext'
import { Home, Search, Library } from 'icons'
import useMedia from 'hooks/useMedia'
import hasSignedIn from 'utils/hasSignedIn'
import isIndexPage from 'utils/isIndexPage'
import { mobileNavigationHeightInRem } from 'utils/styles'
import { media } from 'constants/Theme'

function NavLink ({ isActive, label, Icon, ...props }) {
  return (
    <Link
      css={theme => css`
        align-items: center;
        color: ${isActive ? theme.colors.brand500 : theme.colors.gray500};
        display: flex;
        flex-direction: column;
        height: ${mobileNavigationHeightInRem}rem;
        padding: 0.5rem 0 0.5rem;
      `}
      {...props}
    >
      <div
        css={css`
          margin-bottom: 0.25rem;
        `}
      >
        <Icon />
      </div>
      <span
        css={css`
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        `}
      >
        {label}
      </span>
    </Link>
  )
}

export default function MobileNavigation ({ location: { pathname } }) {
  const isNonDesktop = useMedia(media.nonDesktop)

  // const { handleModalOpen } = useContext(ModalContext)
  // const firebase = useContext(FirebaseContext)

  /* FLAG */

  // const authNav = hasSignedIn ? (
  //   <li
  //     css={css`
  //       margin-left: 2rem;
  //     `}
  //   >
  //     <GhostButton onClick={firebase.signOut}>Log Out</GhostButton>
  //   </li>
  // ) : (
  //   <>
  //     <li
  //       css={css`
  //         margin-left: 2rem;
  //       `}
  //     >
  //       <GhostButton onClick={handleModalOpen}>Log In</GhostButton>
  //     </li>
  //     <li
  //       css={css`
  //         margin-left: 1rem;
  //       `}
  //     >
  //       <PrimaryButton onClick={handleModalOpen}>Get Started</PrimaryButton>
  //     </li>
  //   </>
  // )

  return (
    isNonDesktop && (
      <nav
        css={theme => css`
          background-color: ${theme.colors.white};
          border-top: 1px solid ${theme.colors.gray300};
          bottom: 0;
          height: ${mobileNavigationHeightInRem}rem;
          position: fixed;
          width: 100%;
          z-index: 500;
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
  )
}
