import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

// import { ModalContext } from './Modal'
// import FirebaseContext from 'contexts/FirebaseContext'
import { Home, Search, Library } from 'icons'
import hasSignedIn from 'utils/hasSignedIn'

function NavLink ({ active, label, Icon, ...props }) {
  return (
    <Link
      css={theme => css`
        align-items: center;
        color: ${theme.colors.gray500};
        display: flex;
        flex-direction: column;
        height: 3.5rem;
        padding: 0.5rem 0 0.75rem;
        ${active &&
          css`
            color: ${theme.colors.brand500};
          `};
      `}
      {...props}
    >
      <Icon />
      <span
        css={css`
          font-size: 0.75rem;
          font-weight: 600;
        `}
      >
        {label}
      </span>
    </Link>
  )
}

export default function MobileNavigation () {
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
    <nav
      css={theme => css`
        background-color: ${theme.colors.white};
        bottom: 0;
        height: 3.5rem;
        position: fixed;
        width: 100%;
        z-index: 500;

        ${theme.screens.desktop} {
          display: none;
        }
      `}
    >
      <Location>
        {({ location: { pathname } }) => (
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
                active={pathname === '/' || pathname.includes('category')}
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
                active={pathname === '/search'}
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
                active={pathname === '/me'}
                Icon={Library}
                label='My Library'
                to='/me'
              />
            </li>
          </ul>
        )}
      </Location>
    </nav>
  )
}
