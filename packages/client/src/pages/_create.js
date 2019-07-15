import React from 'react'
import { css } from '@emotion/core'

import CreateCollection from 'components/CreateCollection'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import SignUpReminder from 'components/SignUpReminder'
import { BackButton } from 'components/common'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  screens
} from 'constants/Styles'
import { hasSignedIn } from 'utils/localStorageUtils'

export default function CreatePage () {
  return (
    <>
      <SEO title='Create Collection' />
      <MobileHeader navIcon={<BackButton />} shadow title='Create' />
      <main
        css={css`
          min-height: calc(100vh - ${mobileHeaderHeightInRem}rem);

          ${screens.nonMobile} {
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
            max-width: 50rem;

            ${screens.mobile} {
              padding: 0 0 1rem;
            }
          `}
        >
          <CreateCollection />
          {/* {hasSignedIn() ? <CreateCollection /> : <SignUpReminder />} */}
        </div>
      </main>
    </>
  )
}
