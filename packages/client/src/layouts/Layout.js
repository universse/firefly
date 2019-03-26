import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

import CommonLayout from './CommonLayout'
import IndexLayout from './IndexLayout'
import SignUpForm from 'components/SignUpForm'
import AllCollections from 'contexts/AllCollections'
import Authentication from 'contexts/Authentication'
import LatestActivity from 'contexts/LatestActivity'
import Modal from 'contexts/Modal'
import NormalizedCollections from 'contexts/NormalizedCollections'
import useAccessibleFocusIndicator from 'hooks/useAccessibleFocusIndicator'
import Theme from 'constants/Theme'
import isIndexPage from 'utils/isIndexPage'

export default function Layout ({
  pageContext: { category },
  children,
  location
}) {
  useAccessibleFocusIndicator()

  if (location.pathname === '/welcome') {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  }

  return (
    <AllCollections>
      <ThemeProvider theme={Theme}>
        <NormalizedCollections>
          <Authentication>
            <Modal>
              <LatestActivity>
                {isIndexPage(location.pathname) ? (
                  <IndexLayout category={category} location={location}>
                    {children}
                  </IndexLayout>
                ) : (
                  <CommonLayout location={location}>{children}</CommonLayout>
                )}
              </LatestActivity>
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
