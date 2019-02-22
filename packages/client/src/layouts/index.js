import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

// flag
// import Authentication from 'components/Authentication'
import Modal from 'components/Modal'
import ModalProvider from 'components/ModalProvider'
import AllCollections from 'components/AllCollections'
import Header from 'components/Header'
import MobileNavigation from 'components/MobileNavigation'
import SavedCollections from 'components/SavedCollections'
import SignUpForm from 'components/SignUpForm'
import ModalTypes from 'constants/ModalTypes'
import Theme from 'constants/Theme'
import { headerHeightInRem, mobileHeaderHeightInRem } from 'utils/styles'

export default function Layout ({ children, location }) {
  return (
    <AllCollections location={location}>
      <ThemeProvider theme={Theme}>
        {/* <Authentication> */}
        <ModalProvider>
          <div
            css={theme => css`
              padding-top: ${mobileHeaderHeightInRem}rem;

              ${theme.screens.desktop} {
                padding-top: ${headerHeightInRem}rem;
              }
            `}
          >
            {location.pathname !== '/search' && <Header location={location} />}
            <SavedCollections>{children}</SavedCollections>
            <MobileNavigation location={location} />
          </div>
          <Modal contentLabel='Sign Up' type={ModalTypes.SIGN_UP_FORM}>
            <SignUpForm />
          </Modal>
        </ModalProvider>
        {/* </Authentication> */}
      </ThemeProvider>
    </AllCollections>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
