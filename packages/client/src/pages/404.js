import React from 'react'
import { css } from '@emotion/core'

import SEO from 'components/SEO'
import { Ghost } from 'assets/icons'
import {
  headerHeightInRem,
  bottomBarHeightInRem,
  screens
} from 'constants/Styles'

export default function NotFoundPage () {
  return (
    <>
      <SEO title='The page could not be found.' />
      <main
        css={css`
          align-items: center;
          display: flex;
          justify-content: center;
          min-height: calc(100vh - ${bottomBarHeightInRem}rem);
          padding: 2rem 0;

          ${screens.desktop} {
            min-height: calc(100vh - ${headerHeightInRem}rem);
          }
        `}
      >
        <Ghost />
      </main>
    </>
  )
}
