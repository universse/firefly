import React from 'react'
import { css } from '@emotion/core'

import Header from 'components/Header'
import { MobileNavigation } from 'components/Navigation'
import Media from 'contexts/Media'
import useCloseSnackbar from 'hooks/useCloseSnackbar'
import { headerHeightInRem } from 'constants/Styles'
import { shouldNotHaveMobileNavigation } from 'utils/pathnameUtils'

export default function CommonLayout ({ children, location }) {
  useCloseSnackbar()

  return (
    <Media>
      <div
        css={theme => css`
          ${theme.screens.desktop} {
            padding-top: ${headerHeightInRem}rem;
          }
        `}
      >
        {location.pathname !== '/search' && <Header />}
        {children}
        {!shouldNotHaveMobileNavigation(location.pathname) && (
          <MobileNavigation location={location} />
        )}
      </div>
    </Media>
  )
}
