import React, { useContext } from 'react'
import { Link } from 'gatsby'

import Avatar from './Avatar'
import { SetModalContext } from 'contexts/SetModal'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { logSignUpIntent } from 'utils/amplitude'
import { hasSignedIn } from 'utils/localStorageUtils'

export default function Navigation () {
  const setActiveModalType = useContext(SetModalContext)

  return (
    <nav className='Navigation'>
      <ul>
        <li>
          <Link activeClassName='active' partiallyActive to='/my-library'>
            My Library
          </Link>
        </li>
        <li>
          {hasSignedIn() ? (
            <Avatar />
          ) : (
            <button
              aria-label={AriaLabels.SIGNIN_REGISTER}
              className='GhostButton'
              onClick={() => {
                setActiveModalType(ModalTypes.SIGN_UP_FORM)
                logSignUpIntent()
              }}
              type='button'
            >
              Sign In / Register
            </button>
          )}
        </li>
      </ul>
    </nav>
  )
}
