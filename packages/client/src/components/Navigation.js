import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { ThemeContext, css } from '@emotion/core'

import { AuthenticationContext } from './Authentication'
import { ModalContext } from './Modal'
import FirebaseContext from '../contexts/FirebaseContext'

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
      css={theme => css`
        color: ${theme.colors.gray900};
        font-size: 0.9375rem;
        font-weight: 600;

        :hover {
          color: ${theme.colors.brand500};
        }
      `}
      activeStyle={{ color: theme.colors.brand500 }}
      {...props}
    />
  )
}

export default function Navigation () {
  const user = useContext(AuthenticationContext)
  const { handleModalOpen } = useContext(ModalContext)
  const firebase = useContext(FirebaseContext)

  return (
    <nav>
      <ul
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        {/* <li
          css={css`
            margin-left: 2rem;
          `}
        >
          <NavLink to='/search'>Explore</NavLink>
        </li> */}
        {user ? (
          <>
            <li
              css={css`
                margin-left: 2rem;
              `}
            >
              <NavLink to='/search'>My Library</NavLink>
            </li>
            <li
              css={css`
                margin-left: 2rem;
              `}
            >
              <GhostButton onClick={firebase.signOut}>Log Out</GhostButton>
            </li>
          </>
        ) : (
          <>
            <li
              css={css`
                margin-left: 2rem;
              `}
            >
              <GhostButton onClick={handleModalOpen}>Log In</GhostButton>
            </li>
            {/* <li
              css={css`
                margin-left: 1rem;
              `}
            >
              <PrimaryButton onClick={handleModalOpen}>
                Get Started
              </PrimaryButton>
            </li> */}
          </>
        )}
      </ul>
    </nav>
  )
}
