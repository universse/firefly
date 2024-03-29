import React from 'react'
import PropTypes from 'prop-types'
import 'isomorphic-unfetch'

import IndexLayout from './IndexLayout'
import Header from 'components/Header'
import { MobileNavigation } from 'components/Navigation'
import SignUpForm from 'components/SignUpForm'
import Modal from 'contexts/Modal'
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

  return (
    <>
      <Modal pathname={pathname}>
        <a className='skip-nav' href='#main'>
          Skip to Main Content
        </a>
        {normalizedPathname !== '/search' && (
          <Header noSearch={!!isIndexPage || !!noSearch} />
        )}
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
        <SignUpForm />
      </Modal>
      <MobileNavigation isIndexPage={isIndexPage || false} />
    </>
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
