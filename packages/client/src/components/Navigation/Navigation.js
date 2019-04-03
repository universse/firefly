import React, { memo, useContext } from 'react'
import { css } from '@emotion/core'
import localforage from 'localforage'

import { FirebaseContext } from 'contexts/Firebase'
import { ModalContext } from 'contexts/Modal'
import { GhostButton, NavLink } from './styled'
import LocalStorage from 'constants/LocalStorage'
import ModalTypes from 'constants/ModalTypes'
import { logSignUpIntent } from 'utils/amplitudeUtils'
import { hasSignedIn } from 'utils/localStorageUtils'

const AuthNav = memo(function () {
  const { openModal } = useContext(ModalContext)
  const firebase = useContext(FirebaseContext)

  return hasSignedIn() ? (
    <li
      css={css`
        margin-left: 1.5rem;
      `}
    >
      <GhostButton
        aria-label='Sign Out'
        onClick={() =>
          firebase.signOut().then(() => {
            if (window.amplitude) {
              window.amplitude.getInstance().setUserId(null)
              window.amplitude.getInstance().regenerateDeviceId()
            }
            localforage.clear()
            window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
            window.location.reload()
          })
        }
      >
        Log Out
      </GhostButton>
    </li>
  ) : (
    <li
      css={css`
        margin-left: 1.5rem;
      `}
    >
      <GhostButton
        aria-label='Log In or Register'
        onClick={() => {
          openModal(ModalTypes.SIGN_UP_FORM)
          logSignUpIntent()
        }}
      >
        Log In / Register
      </GhostButton>
    </li>
  )
})

function Navigation () {
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
          <NavLink to='/my-library'>My Library</NavLink>
        </li>
        {/* <AuthNav /> */}
      </ul>
    </nav>
  )
}

export default memo(Navigation)
