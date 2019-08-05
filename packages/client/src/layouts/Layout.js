import React from 'react'
import PropTypes from 'prop-types'

import IndexLayout from './IndexLayout'
import Header from 'components/Header'
import { MobileNavigation } from 'components/Navigation'
import SignUpForm from 'components/SignUpForm'
import Authentication from 'contexts/Authentication'
import LatestActivity from 'contexts/LatestActivity'
import Media from 'contexts/Media'
import Modal from 'contexts/Modal'
import NormalizedCollections from 'contexts/NormalizedCollections'
import SetSnackbar from 'contexts/SetSnackbar'
import URLParams from 'contexts/URLParams'
import UserData from 'contexts/UserData'
import { getNormalizedPathname } from 'utils/pathnameUtils'

export default function Layout ({
  pageContext: { category, isIndexPage, noSearch },
  children,
  location
}) {
  const { pathname } = location
  const normalizedPathname = getNormalizedPathname(pathname)

  if (normalizedPathname === '/offline-plugin-app-shell-fallback') return null

  if (normalizedPathname === '/welcome') return children

  return (
    <Media>
      <NormalizedCollections>
        <Authentication>
          <Modal pathname={pathname}>
            <a className='skip-nav' href='#main'>
              Skip to Main Content
            </a>
            {normalizedPathname !== '/search' && (
              <Header noSearch={!!isIndexPage || !!noSearch} />
            )}
            <LatestActivity>
              <SetSnackbar pathname={pathname}>
                <UserData canUndo={normalizedPathname === '/my-library'}>
                  {isIndexPage ? (
                    <URLParams location={location}>
                      <IndexLayout category={category} pathname={pathname}>
                        {children}
                      </IndexLayout>
                    </URLParams>
                  ) : (
                    children
                  )}
                </UserData>
              </SetSnackbar>
            </LatestActivity>
            <SignUpForm />
          </Modal>
        </Authentication>
        <MobileNavigation isIndexPage={isIndexPage || false} />
      </NormalizedCollections>
    </Media>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.number,
    isIndexPage: PropTypes.bool,
    noSearch: PropTypes.bool
  }).isRequired
}
