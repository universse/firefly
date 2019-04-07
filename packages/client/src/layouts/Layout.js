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
import SetSnackbar from 'contexts/SetSnackbar'
import UserData from 'contexts/UserData'
import useAccessibleFocusIndicator from 'hooks/useAccessibleFocusIndicator'
// // import useSyncOfflineQueue from 'hooks/useSyncOfflineQueue'
import Theme from 'constants/Theme'
import { getNormalizedPathname, isIndexPage } from 'utils/pathnameUtils'

export default function Layout ({
  pageContext: { category },
  children,
  location
}) {
  useAccessibleFocusIndicator()
  // useSyncOfflineQueue()

  if (getNormalizedPathname(location.pathname) === '/welcome') {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  }

  return (
    <AllCollections>
      <ThemeProvider theme={Theme}>
        <NormalizedCollections>
          <Authentication>
            <Modal>
              <LatestActivity>
                <SetSnackbar>
                  <UserData
                    canUndo={
                      getNormalizedPathname(location.pathname) === '/my-library'
                    }
                  >
                    {isIndexPage(location.pathname) ? (
                      <IndexLayout category={category} location={location}>
                        {children}
                      </IndexLayout>
                    ) : (
                      <CommonLayout location={location}>
                        {children}
                      </CommonLayout>
                    )}
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
