import React from 'react'
import { css } from '@emotion/core'

import Header from 'components/Header'
import MobileNavigation from 'components/MobileNavigation'
import SavedCollections from 'contexts/SavedCollections'
import shouldNotHaveMobileNavigation from 'utils/shouldNotHaveMobileNavigation'
import { headerHeightInRem } from 'utils/styles'

export default function Site ({ children, location }) {
  return (
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
  )
}
