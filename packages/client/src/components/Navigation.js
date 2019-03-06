import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { ThemeContext, css } from '@emotion/core'

import { ModalContext } from 'components/ModalProvider'
import FirebaseContext from 'contexts/FirebaseContext'
import LocalStorage from 'constants/LocalStorage'
import { hasSignedIn } from 'utils/localStorageUtils'

// darker shade hover
function GhostButton (props) {
  return (
    <button
      css={theme => css`
        align-items: center;
        border: 2px solid ${theme.colors.brand500};
        border-radius: 1rem;
        color: ${theme.colors.brand500};
        display: flex;
        font-size: 0.9375rem;
        font-weight: 700;
        height: 2rem;
        padding: 0 1rem;

        &:hover {
          background-color: ${theme.colors.brand500};
          color: #fff;
        }
      `}
      type='button'
      {...props}
    />
  )
}

function PrimaryButton (props) {
  return (
    <button
      css={theme => css`
        align-items: center;
        background-color: ${theme.colors.brand500};
        border-radius: 1rem;
        color: #fff;
        display: flex;
        font-size: 0.9375rem;
        border-bottom: 1px solid transparent;
        font-weight: 700;
        height: 2rem;
        padding: 0 1rem;

        &:hover {
          background-color: ${theme.colors.brand500};
        }
      `}
      type='button'
      {...props}
    />
  )
}

function NavLink (props) {
  const theme = useContext(ThemeContext)

  return (
    <Link
      activeStyle={{ borderBottom: `2px solid ${theme.colors.brand500}` }}
      css={theme => css`
        align-items: center;
        border-bottom: 2px solid transparent;
        color: ${theme.colors.gray900};
        display: flex;
        font-size: 0.9375rem;
        font-weight: 600;
        height: 2rem;

        &:hover {
          border-bottom: 2px solid ${theme.colors.brand500};
        }
      `}
      {...props}
    />
  )
}

export default function Navigation () {
  const { openModal } = useContext(ModalContext)
  const firebase = useContext(FirebaseContext)

  const authNav = hasSignedIn() ? (
    <li
      css={css`
        margin-left: 1.5rem;
      `}
    >
      <GhostButton
        onClick={() =>
          firebase.signOut().then(() => {
            window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
            window.location.reload()
          })
        }
      >
        Log Out
      </GhostButton>
    </li>
  ) : (
    <>
      <li
        css={css`
          margin-left: 1.5rem;
        `}
      >
        <GhostButton onClick={() => openModal('signUpForm')}>Join</GhostButton>
      </li>
      <li
        css={css`
          margin-left: 1rem;
        `}
      >
        <PrimaryButton onClick={() => openModal('signUpForm')}>
          Get Started
        </PrimaryButton>
      </li>
    </>
  )

  return (
    <nav>
      <ul
        css={css`
          align-items: center;
          display: flex;
        `}
      >
        <li
          css={css`
            margin-left: 1.5rem;
          `}
        >
          <NavLink to='/me'>My Library</NavLink>
        </li>
        {authNav}
      </ul>
    </nav>
  )
}
