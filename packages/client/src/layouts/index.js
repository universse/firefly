import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import Authentication from 'components/Authentication'
import ModalProvider from 'components/ModalProvider'
import AllCollections from 'components/AllCollections'
import Header from 'components/Header'
import Media from 'components/Media'
import MobileNavigation from 'components/MobileNavigation'
import SavedCollections from 'components/SavedCollections'
import SignUpForm from 'components/SignUpForm'
import Theme from 'constants/Theme'
import { headerHeightInRem, mobileHeaderHeightInRem } from 'utils/styles'

export default function Layout ({ children, location }) {
  return (
    <AllCollections location={location}>
      <ThemeProvider theme={Theme}>
        <Authentication>
          <ModalProvider>
            <Media>
              <div
                css={theme => css`
                  padding-top: ${mobileHeaderHeightInRem}rem;

                  ${theme.screens.desktop} {
                    padding-top: ${headerHeightInRem}rem;
                  }
                `}
              >
                {location.pathname !== '/search' && (
                  <Header location={location} />
                )}
                <SavedCollections>{children}</SavedCollections>
                {!location.pathname.includes('/collection/') && (
                  <MobileNavigation location={location} />
                )}
              </div>
              <SignUpForm />
            </Media>
          </ModalProvider>
        </Authentication>
      </ThemeProvider>
    </AllCollections>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
