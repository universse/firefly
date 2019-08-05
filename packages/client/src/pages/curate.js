import React from 'react'
import PropTypes from 'prop-types'

import Curation from 'components/Curation'
import ErrorBoundary from 'components/ErrorBoundary'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import SignUpReminder from 'components/SignUpReminder'
import { BackButton } from 'components/common'

import { hasSignedIn } from 'utils/localStorageUtils'
import { getParamFromPathname } from 'utils/pathnameUtils'

export default function CuratePage ({
  location: { pathname },
  pageContext: { matchPath }
}) {
  const id = getParamFromPathname(pathname, matchPath)

  return (
    <>
      <SEO title='Curate a Learning Collection' />
      <MobileHeader navIcon={<BackButton />} shadow title='Curate' />
      {!hasSignedIn() ? (
        <ErrorBoundary>
          <Curation id={id} />
        </ErrorBoundary>
      ) : (
        <SignUpReminder />
      )}
    </>
  )
}

CuratePage.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    matchPath: PropTypes.string.isRequired
  }).isRequired
}
