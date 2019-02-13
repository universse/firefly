import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

// flag
// import Authentication from 'components/Authentication'
// import Modal from 'components/Modal'
import Header from 'components/Header'
import SavedCollections from 'components/SavedCollections'
import Theme from 'constants/Theme'
import MobileNavigation from 'components/MobileNavigation'

export default function Layout ({ children, location }) {
  return (
    <ThemeProvider theme={Theme}>
      {/* <Authentication> */}
      {/* <Modal> */}
      <div
        css={theme => css`
          ${theme.screens.desktop} {
            margin-top: 4rem;
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
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
