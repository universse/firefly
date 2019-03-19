import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

import SignUpForm from 'components/SignUpForm'
import Site from 'components/Site'
import AllCollections from 'contexts/AllCollections'
import Authentication from 'contexts/Authentication'
import Media from 'contexts/Media'
import Modal from 'contexts/Modal'
import NormalizedCollections from 'contexts/NormalizedCollections'
import Theme from 'constants/Theme'
import isIndexPage from 'utils/isIndexPage'

export default function Layout ({ children, location }) {
  if (location.pathname === '/welcome') {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  }

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
