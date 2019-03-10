import React from 'react'
import { css } from '@emotion/core'

import CreateCollection from 'components/CreateCollection'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import SignUpReminder from 'components/SignUpReminder'
import { IconButton } from 'components/common'
import { Back } from 'icons'
import { hasSignedIn } from 'utils/localStorageUtils'
import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem
} from 'utils/styles'

export default function CreatePage () {
  return (
    <>
      <SEO title='Create Collection' />
      <MobileHeader
        navIcon={
          <IconButton
            aria-label='Go Back to Previous Screen'
            onClick={() => window.history.back()}
          >
            <Back />
          </IconButton>
        }
        shadow
        title='Create'
      />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - ${mobileHeaderHeightInRem}rem);

          ${theme.screens.nonMobile} {
            padding: 1rem 0;
          }

          ${theme.screens.desktop} {
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 2rem 0;
          }
        `}
      >
        <div
          css={theme => css`
            ${baseWrapper};
            max-width: 50rem;

            ${theme.screens.mobile} {
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
