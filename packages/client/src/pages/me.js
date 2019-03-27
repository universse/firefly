import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import SignUpReminder from 'components/SignUpReminder'
import { MediaContext } from 'contexts/Media'
import { hasSignedIn } from 'utils/localStorageUtils'
import { headerHeightInRem, mobileBarsHeightInRem } from 'constants/Styles'

export default function MePage (props) {
  const isDesktop = useContext(MediaContext)
  // sign up modal
  // created collections
  return (
    <>
      <SEO title='Profile' />
      <MobileHeader shadow title='Profile' />
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
          {hasSignedIn() ? <SignUpReminder /> : <SignUpReminder />}
        </div>
      </main>
    </>
  )
}
