import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import SignUpReminder from 'components/SignUpReminder'
import { MediaContext } from 'contexts/Media'
import {
  headerHeightInRem,
  mobileBarsHeightInRem,
  screens
} from 'constants/Styles'
import { hasSignedIn } from 'utils/localStorageUtils'

export default function MePage (props) {
  const isDesktop = useContext(MediaContext)

  // created collections
  return (
    <>
      <SEO title='Profile' />
      <MobileHeader shadow title='Profile' />
      <main
        css={css`
          min-height: calc(100vh - ${mobileBarsHeightInRem}rem);
          padding: 0 0 1rem;

          ${screens.tablet} {
            padding: 1rem 0;
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
          {hasSignedIn() ? <SignUpReminder /> : <SignUpReminder />}
        </div>
      </main>
    </>
  )
}
