import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

// flag
// import Authentication from 'components/Authentication'
// import Modal from 'components/Modal'
import AllCollections from 'components/AllCollections'
import Header from 'components/Header'
import MobileNavigation from 'components/MobileNavigation'
import SavedCollections from 'components/SavedCollections'
import Theme from 'constants/Theme'
import { headerHeightInRem } from 'utils/styles'

export default function Layout ({ children, location }) {
  return (
    <AllCollections location={location}>
      <ThemeProvider theme={Theme}>
        {/* <Authentication> */}
        {/* <Modal> */}
        <div
          css={theme => css`
            ${theme.screens.desktop} {
              margin-top: ${headerHeightInRem}rem;
            }
          `}
        >
          <Header location={location} />
          <SavedCollections>{children}</SavedCollections>
          <MobileNavigation location={location} />
        </div>
        {/* </Modal> */}
        {/* </Authentication> */}
      </ThemeProvider>
    </AllCollections>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
