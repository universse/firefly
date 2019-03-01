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
import NormalizedCollections from 'components/NormalizedCollections'
import SavedCollections from 'components/SavedCollections'
import SignUpForm from 'components/SignUpForm'
import Theme from 'constants/Theme'
import isIndexPage from 'utils/isIndexPage'
import { headerHeightInRem } from 'utils/styles'

function Site ({ children, location }) {
  return (
    <div
      css={theme => css`
        ${theme.screens.desktop} {
          padding-top: ${headerHeightInRem}rem;
        }
      `}
    >
      {location.pathname !== '/search' && <Header location={location} />}
      <SavedCollections>{children}</SavedCollections>
      {!location.pathname.includes('/collection/') && (
        <MobileNavigation location={location} />
      )}
    </div>
  )
}

export default function Layout ({ children, location }) {
  return (
    <AllCollections location={location}>
      <ThemeProvider theme={Theme}>
        <NormalizedCollections>
          <Authentication>
            <ModalProvider>
              {isIndexPage(location.pathname) ? (
                <Site location={location}>{children}</Site>
              ) : (
                <Media>
                  <Site location={location}>{children}</Site>
                </Media>
              )}
              <SignUpForm />
            </ModalProvider>
          </Authentication>
        </NormalizedCollections>
      </ThemeProvider>
    </AllCollections>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
