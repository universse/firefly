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
import SetSnackbar from 'contexts/SetSnackbar'
import UserData from 'contexts/UserData'
import useAccessibleFocusIndicator from 'hooks/useAccessibleFocusIndicator'
import Theme from 'constants/Theme'
import {
  getNormalizedPathname,
  shouldNotHaveMobileNavigation
} from 'utils/pathnameUtils'
import { isIndexPage } from '../../gatsby/utils'

export default function Layout ({
  pageContext: { category },
  children,
  location
}) {
  useAccessibleFocusIndicator()

  const { pathname } = location

  const normalizedPathname = getNormalizedPathname(pathname)

  if (normalizedPathname === '/welcome') {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  }

  return (
    <ThemeProvider theme={Theme}>
      <AllCollections>
        <Authentication>
          <Modal>
            <LatestActivity>
              <SetSnackbar location={location}>
                <UserData canUndo={normalizedPathname === '/my-library'}>
                  {normalizedPathname !== '/search' && <Header />}
                  {isIndexPage(pathname) ? (
                    <IndexLayout category={category} location={location}>
                      {children}
                    </IndexLayout>
                  ) : (
                    <Media>{children}</Media>
                  )}
                  {!shouldNotHaveMobileNavigation(pathname) && (
                    <MobileNavigation location={location} />
                  )}
                </UserData>
              </SetSnackbar>
            </LatestActivity>
            <SignUpForm />
          </Modal>
        </Authentication>
      </AllCollections>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string
  }).isRequired
}
