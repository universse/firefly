import React from 'react'
import { css } from '@emotion/core'

import SEO from 'components/SEO'
import { Ghost } from '../icons'
import { headerHeightInRem } from 'constants/Styles'

export default function NotFoundPage () {
  return (
    <>
      <SEO title='The page could not be found.' />
      <main
        css={theme => css`
          align-items: center;
          background-color: ${theme.colors.gray100};
          display: flex;
          justify-content: center;
          min-height: calc(100vh - ${headerHeightInRem}rem);
          padding: 2rem 0;
        `}
      >
        <Ghost />
      </main>
    </>
  )
}
