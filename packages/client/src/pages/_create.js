import React from 'react'
import { css } from '@emotion/core'

import CreateCollection from 'components/CreateCollection'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import SignUpReminder from 'components/SignUpReminder'
import { Back } from 'icons'
import AriaLabels from 'constants/AriaLabels'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  screens
} from 'constants/Styles'
import goBack from 'utils/goBack'
import { hasSignedIn } from 'utils/localStorageUtils'

export default function CreatePage () {
  return (
    <>
      <SEO title='Create Collection' />
      <MobileHeader
        navIcon={
          <button
            aria-label={AriaLabels.GO_BACK}
            className='IconButton'
            onClick={goBack}
            type='button'
          >
            <Back />
          </button>
        }
        shadow
        title='Create'
      />
      <main
        css={css`
          background-color: var(--colors-gray100);
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
