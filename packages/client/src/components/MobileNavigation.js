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
        padding: 0.5rem 0 0.5rem;
        ${active &&
          css`
            color: ${theme.colors.brand500};
          `};
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

function MobileNavigation ({ location: { pathname } }) {
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
        border-top: 1px solid ${theme.colors.gray300};
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
            active={pathname === '/' || pathname.includes('/category/')}
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
    </nav>
  )
}

export default () => (
  <Location>
    {({ location }) =>
      !location.pathname.includes('/collection/') && (
        <MobileNavigation location={location} />
      )
    }
  </Location>
)
