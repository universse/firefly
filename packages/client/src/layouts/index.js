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

export default function Layout ({ children }) {
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
        <Header />
        <SavedCollections>{children}</SavedCollections>
      </div>
      {/* </Modal> */}
      {/* </Authentication> */}
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
