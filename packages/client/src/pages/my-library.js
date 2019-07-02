import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { Collection } from 'components/Collections'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { AuthenticationContext } from 'contexts/Authentication'
import { MediaContext } from 'contexts/Media'
import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import { SetModalContext } from 'contexts/SetModal'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import { UserDataContext } from 'contexts/UserData'
import { EmptyLibrary } from 'assets/illustrations'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import {
  headerHeightInRem,
  mobileBarsHeightInRem,
  mobileNavigationHeightInRem,
  screens
} from 'constants/Styles'
import { logSignUpIntent } from 'utils/amplitude'
import { hasSignedIn } from 'utils/localStorageUtils'

// TODO Suspense
export default function MyLibraryPage () {
  const userData = useContext(UserDataContext)
  const user = useContext(AuthenticationContext)
  const isDesktop = useContext(MediaContext)
  const openSnackbar = useContext(SetSnackbarContext)
  const setActiveModalType = useContext(SetModalContext)
  const normalizedCollections = useContext(NormalizedCollectionsContext)

  const [hasSaved, setHasSaved] = useState()

  useLayoutEffect(() => {
    if (typeof hasSaved !== 'boolean' && userData) {
      setHasSaved(!!Object.keys(userData.save).length)
    }
  }, [hasSaved, userData])

  useEffect(() => {
    if (hasSignedIn() || user) return

    hasSaved &&
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
  }, [hasSaved, openSnackbar, setActiveModalType, user])

  return (
    <>
      <SEO title='My Library' />
      <MobileHeader shadow title='My Library' />
      <main
        css={css`
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
        id='main'
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
          {isDesktop && hasSaved && (
            <div
              css={css`
                margin: 0 0 1.5rem 2rem;
              `}
            >
              <h2
                css={css`
                  color: var(--black800);
                  font-size: 1.25rem;
                  line-height: 2rem;
                `}
              >
                My Saved Collections
              </h2>
            </div>
          )}
          {userData && !hasSaved && (
            <div
              css={css`
                align-items: center;
                display: flex;
                flex-direction: column;
              `}
            >
              <EmptyLibrary />
              <span
                css={css`
                  color: var(--black900);
                  font-family: Spectral, serif;
                  font-size: 1.5rem;
                  font-weight: 800;
                  line-height: 2rem;
                  text-align: center;
                `}
              >
                Your library is empty
              </span>
              <span
                css={css`
                  color: var(--black800);
                  font-size: 1.125rem;
                  font-weight: 400;
                  line-height: 2rem;
                  text-align: center;
                `}
              >
                Save a collection and it will show up here.
              </span>
            </div>
          )}
          {normalizedCollections && hasSaved && (
            <ul
              css={css`
                box-shadow: var(--shadows-03);

                li:last-child > div {
                  border-bottom: 1px solid transparent;
                }

                ${screens.nonMobile} {
                  border-radius: 8px;
                }
              `}
            >
              {Object.keys(userData.save).map(id => (
                <li
                  key={id}
                  css={css`
                    position: relative;
                  `}
                >
                  <Collection
                    id={id}
                    //  isLoved={!!userData.love[id]}
                    isSaved
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  )
}
