import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Avatar from './Avatar'
import { GhostButton, NavLink } from './styled'
import { SetModalContext } from 'contexts/SetModal'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { logSignUpIntent } from 'utils/amplitudeUtils'
import { hasSignedIn } from 'utils/localStorageUtils'

function Navigation ({ normalizedPathname }) {
  const setActiveModalType = useContext(SetModalContext)

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
          <NavLink
            isActive={normalizedPathname === '/my-library'}
            to='/my-library'
          >
            My Library
          </NavLink>
        </li>
        <li
          css={css`
            margin-left: 1.5rem;
          `}
        >
          {hasSignedIn() ? (
            <Avatar />
          ) : (
            <GhostButton
              aria-label={AriaLabels.SIGNIN_REGISTER}
              onClick={() => {
                setActiveModalType(ModalTypes.SIGN_UP_FORM)
                logSignUpIntent()
              }}
            >
              Sign In / Register
            </GhostButton>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default memo(Navigation)

Navigation.propTypes = {
  normalizedPathname: PropTypes.string.isRequired
}
