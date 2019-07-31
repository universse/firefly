import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import CreateCollection from 'components/CreateCollection'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import SignUpReminder from 'components/SignUpReminder'
import { BackButton } from 'components/common'
import {
  bottomBarHeightInRem,
  headerHeightInRem,
  mobileBarsHeightInRem,
  mobileProgressBarHeightInRem,
  screens
} from 'constants/Styles'
import { getParamFromPathname } from 'utils/pathnameUtils'
import { hasSignedIn } from 'utils/localStorageUtils'

export default function CuratePage ({ location: { pathname } }) {
  const id = getParamFromPathname(pathname)

  return (
    <>
      <SEO title='Curate a Learning Collection' />
      <MobileHeader navIcon={<BackButton />} shadow title='Curate' />
      <div
        className='base'
        css={css`
          min-height: calc(100vh - ${mobileBarsHeightInRem}rem);

          ${screens.mobile} {
            padding: 0 0
              ${bottomBarHeightInRem + mobileProgressBarHeightInRem}rem;
          }

          ${screens.tablet} {
            padding-bottom: ${bottomBarHeightInRem +
              mobileProgressBarHeightInRem}rem;
          }

          ${screens.desktop} {
            max-width: 64rem;
            min-height: calc(100vh - ${headerHeightInRem}rem);
          }
        `}
      >
        <div
          css={css`
            display: grid;
            grid-gap: 1.5rem;
            grid-template-areas:
              'title'
              'list';
            margin: 1.5rem 0;

            ${screens.desktop} {
              grid-gap: 3rem 1.5rem;
              grid-template-areas:
                '. title title'
                'widget list sidebar';
              grid-template-columns: 2.5rem 1fr 19rem;
              margin: 2.5rem 0 0 0;
            }
          `}
        >
          <CreateCollection id={id} />
          {/* {hasSignedIn() ? <CreateCollection /> : <SignUpReminder />} */}
        </div>
      </div>
    </>
  )
}

CuratePage.propTypes = {
  location: PropTypes.object.isRequired
}
