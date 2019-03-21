import React from 'react'
import { css } from '@emotion/core'

import Header from 'components/Header'
import { MobileNavigation } from 'components/Navigation'
import Media from 'contexts/Media'
import SavedCollections from 'contexts/SavedCollections'
import useAccessibleFocusIndicator from 'hooks/useAccessibleFocusIndicator'
import shouldNotHaveMobileNavigation from 'utils/shouldNotHaveMobileNavigation'
import { headerHeightInRem } from 'utils/styles'

export default function CommonLayout ({ children, location }) {
  useAccessibleFocusIndicator()

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
        <SavedCollections>{children}</SavedCollections>
        {!shouldNotHaveMobileNavigation(location.pathname) && (
          <MobileNavigation location={location} />
        )}
      </div>
    </Media>
  )
}
