import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import Header from 'components/Header'
import MobileNavigation from 'components/MobileNavigation'
import Media from 'contexts/Media'
import Modal from 'contexts/Modal'
import AllCollections from 'contexts/AllCollections'
import Authentication from 'contexts/Authentication'
import NormalizedCollections from 'contexts/NormalizedCollections'
import SavedCollections from 'contexts/SavedCollections'
import SignUpForm from 'components/SignUpForm'
import Theme from 'constants/Theme'
import isIndexPage from 'utils/isIndexPage'
import shouldNotHaveMobileNavigation from 'utils/shouldNotHaveMobileNavigation'
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
      {location.pathname !== '/search' && <Header />}
      <SavedCollections>{children}</SavedCollections>
      {!shouldNotHaveMobileNavigation(location.pathname) && (
        <MobileNavigation location={location} />
      )}
    </div>
  )
}

export default function Layout ({ children, location }) {
  return (
    <AllCollections>
      <ThemeProvider theme={Theme}>
        <NormalizedCollections>
          <Authentication>
            <Modal>
              {isIndexPage(location.pathname) ? (
                <Site location={location}>{children}</Site>
              ) : (
                <Media>
                  <Site location={location}>{children}</Site>
                </Media>
              )}
              <SignUpForm />
            </Modal>
          </Authentication>
        </NormalizedCollections>
      </ThemeProvider>
    </AllCollections>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
