import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

import IndexLayout from './IndexLayout'
import Header from 'components/Header'
import { MobileNavigation } from 'components/Navigation'
import SignUpForm from 'components/SignUpForm'
import AllCollections from 'contexts/AllCollections'
import Authentication from 'contexts/Authentication'
import LatestActivity from 'contexts/LatestActivity'
import Media from 'contexts/Media'
import Modal from 'contexts/Modal'
import NormalizedCollections from 'contexts/NormalizedCollections'
import SetSnackbar from 'contexts/SetSnackbar'
import URLParams from 'contexts/URLParams'
import UserData from 'contexts/UserData'
import useAccessibleFocusIndicator from 'hooks/useAccessibleFocusIndicator'
// import useSyncOfflineQueue from 'hooks/useSyncOfflineQueue'
import Theme from 'constants/Theme'
import {
  getNormalizedPathname,
  isIndexPage,
  shouldNotHaveMobileNavigation
} from 'utils/pathnameUtils'

export default function Layout ({
  pageContext: { category },
  children,
  location
}) {
  useAccessibleFocusIndicator()
  // useSyncOfflineQueue()

  const { pathname } = location

  const normalizedPathname = getNormalizedPathname(pathname)

  if (normalizedPathname === '/welcome') {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  }

  return (
    <AllCollections>
      <ThemeProvider theme={Theme}>
        <NormalizedCollections>
          <Authentication>
            <Modal>
              <LatestActivity>
                <SetSnackbar location={location}>
                  <UserData canUndo={normalizedPathname === '/my-library'}>
                    <URLParams location={location}>
                      {normalizedPathname !== '/search' && <Header />}
                      {isIndexPage(pathname) ? (
                        <IndexLayout category={category}>
                          {children}
                        </IndexLayout>
                      ) : (
                        <Media>{children}</Media>
                      )}
                      {!shouldNotHaveMobileNavigation(pathname) && (
                        <MobileNavigation location={location} />
                      )}
                    </URLParams>
                  </UserData>
                </SetSnackbar>
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
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string
  }).isRequired
}
