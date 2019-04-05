import React, { memo, useContext, useEffect } from 'react'
import { css } from '@emotion/core'

import { Collection } from 'components/Collections'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { AuthenticationContext } from 'contexts/Authentication'
import { MediaContext } from 'contexts/Media'
import { ModalContext } from 'contexts/Modal'
import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import { UserDataContext } from 'contexts/UserData'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import { headerHeightInRem, mobileBarsHeightInRem } from 'constants/Styles'
import { logSignUpIntent } from 'utils/amplitudeUtils'
import { hasSignedIn } from 'utils/localStorageUtils'

const MyLibraryPage = memo(function ({ openModal }) {
  const normalizedCollections = useContext(NormalizedCollectionsContext)
  const userData = useContext(UserDataContext)
  const user = useContext(AuthenticationContext)
  const isDesktop = useContext(MediaContext)
  const setSnackbar = useContext(SetSnackbarContext)

  // useEffect(
  //   () => {
  //     if (!hasSignedIn() && !user) {
  //       setSnackbar({
  //         buttonProps: {
  //           'aria-label': AriaLabels.SIGNIN_REGISTER,
  //           children: 'Sign In',
  //           onClick: () => {
  //             openModal(ModalTypes.SIGN_UP_FORM)
  //             logSignUpIntent()
  //           }
  //         },
  //         message: 'Sign in to sync saved collections across devices.',
  //         timeout: 4000
  //       })
  //     }
  //   },
  //   [openModal, setSnackbar, user]
  // )

  return (
    <>
      <SEO title='My Library' />
      <MobileHeader shadow title='My Saved Collections' />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - ${mobileBarsHeightInRem}rem);
          padding: 0 0 1rem;

          ${theme.screens.tablet} {
            padding: 1rem 0;
          }

          ${theme.screens.desktop} {
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 2rem 0;
          }
        `}
      >
        <div
          className='base'
          css={theme => css`
            max-width: 48rem;

            ${theme.screens.mobile} {
              padding: 0;
            }
          `}
        >
          {isDesktop && (
            <div
              css={css`
                margin: 0 0 1.5rem 2rem;
              `}
            >
              <h1
                css={theme => css`
                  color: ${theme.colors.gray800};
                  font-size: 1.25rem;
                  line-height: 2rem;
                `}
              >
                My Saved Collections
              </h1>
            </div>
          )}
          <ul
            css={theme => css`
              background-color: #fff;

              li:last-child div {
                border: none;
              }

              ${theme.screens.nonMobile} {
                border-radius: 8px;
                box-shadow: ${theme.shadows[0]};
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
                    isLoved={userData.love[id]}
                    isSaved
                  />
                </li>
              ))}
          </ul>
        </div>
      </main>
    </>
  )
})

export default function (props) {
  const { openModal } = useContext(ModalContext)

  return <MyLibraryPage {...props} openModal={openModal} />
}
