import React, { useContext, useEffect, useRef } from 'react'
import { css } from '@emotion/core'

import { Collection } from 'components/Collections'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { AuthenticationContext } from 'contexts/Authentication'
import { MediaContext } from 'contexts/Media'
import { AllCollectionsContext } from 'contexts/AllCollections'
import { SetModalContext } from 'contexts/SetModal'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import { UserDataContext } from 'contexts/UserData'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import {
  headerHeightInRem,
  mobileBarsHeightInRem,
  mobileNavigationHeightInRem,
  screens
} from 'constants/Styles'
import { logSignUpIntent } from 'utils/amplitudeUtils'
import { hasSignedIn } from 'utils/localStorageUtils'

export default function MyLibraryPage () {
  const { normalizedCollections } = useContext(AllCollectionsContext)
  const userData = useContext(UserDataContext)
  const user = useContext(AuthenticationContext)
  const isDesktop = useContext(MediaContext)
  const openSnackbar = useContext(SetSnackbarContext)
  const setActiveModalType = useContext(SetModalContext)

  const initialSavedCount = useRef()

  useEffect(() => {
    if (isNaN(initialSavedCount.current) && userData) {
      initialSavedCount.current = Object.keys(userData.save).length
    }
  }, [userData])

  useEffect(() => {
    if (hasSignedIn() || user) return

    initialSavedCount.current &&
      openSnackbar({
        buttonProps: {
          'aria-label': AriaLabels.SIGNIN_REGISTER,
          children: 'Sign In',
          onClick: () => {
            setActiveModalType(ModalTypes.SIGN_UP_FORM)
            logSignUpIntent()
          }
        },
        message: 'Sign in to sync your saved collections across devices.',
        timeout: 5000
      })
  }, [openSnackbar, setActiveModalType, user])

  return (
    <>
      <SEO title='My Library' />
      <MobileHeader shadow title='My Library' />
      <main
        css={css`
          background-color: var(--colors-gray100);
          min-height: calc(100vh - ${mobileBarsHeightInRem}rem);
          padding: 0 0 ${mobileNavigationHeightInRem}rem;

          ${screens.tablet} {
            padding: 1rem 0 ${mobileNavigationHeightInRem + 1}rem;
          }

          ${screens.desktop} {
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 2rem 0;
          }
        `}
      >
        <div
          className='base'
          css={css`
            max-width: 48rem;

            ${screens.mobile} {
              padding: 0;
            }
          `}
        >
          {isDesktop && !!initialSavedCount.current && (
            <div
              css={css`
                margin: 0 0 1.5rem 2rem;
              `}
            >
              <h1
                css={css`
                  color: var(--colors-gray800);
                  font-size: 1.25rem;
                  line-height: 2rem;
                `}
              >
                My Saved Collections
              </h1>
            </div>
          )}
          <ul
            css={css`
              background-color: #fff;

              li:last-child div {
                border: none;
              }

              ${screens.nonMobile} {
                border-radius: 8px;
                box-shadow: var(--shadows-01);
              }
            `}
          >
            {normalizedCollections &&
              userData &&
              Object.keys(userData.save).map(id => (
                <li
                  key={id}
                  css={css`
                    position: relative;
                  `}
                >
                  <Collection
                    collection={normalizedCollections[id.toLowerCase()]}
                    isLoved={!!userData.love[id]}
                    isSaved
                  />
                </li>
              ))}
          </ul>
        </div>
      </main>
    </>
  )
}
