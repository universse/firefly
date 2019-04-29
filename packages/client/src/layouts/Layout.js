import React from 'react'
import PropTypes from 'prop-types'

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
import {
  getNormalizedPathname,
  shouldHaveMobileNavigation
} from 'utils/pathnameUtils'

import './layout.scss'
import 'fonts/Inter/index.css'
import 'fonts/PlayfairDisplay/index.css'

export default function Layout ({
  pageContext: { category, isIndexPage },
  children,
  location
}) {
  const normalizedPathname = getNormalizedPathname(location.pathname)

  if (normalizedPathname === '/offline-plugin-app-shell-fallback') return null

  if (normalizedPathname === '/welcome') return children

  return (
    <AllCollections>
      <Authentication>
        <Modal>
          {normalizedPathname !== '/search' && <Header />}
          <LatestActivity>
            <SetSnackbar location={location}>
              <UserData canUndo={normalizedPathname === '/my-library'}>
                {isIndexPage ? (
                  <IndexLayout category={category} location={location}>
                    {children}
                  </IndexLayout>
                ) : (
                  <Media>{children}</Media>
                )}
              </UserData>
            </SetSnackbar>
          </LatestActivity>
          <SignUpForm />
        </Modal>
      </Authentication>
      {shouldHaveMobileNavigation(location.pathname) && (
        <MobileNavigation isIndexPage={isIndexPage || false} />
      )}
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
