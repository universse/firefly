import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Curation from 'components/Curation'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import SignUpReminder from 'components/SignUpReminder'
import { BackButton } from 'components/common'

import firebaseWorker from 'utils/firebaseWorker'
import { hasSignedIn } from 'utils/localStorageUtils'
import { getParamFromPathname } from 'utils/pathnameUtils'

// TODO Suspense
export default function CuratePage ({
  location: { pathname, state },
  pageContext: { matchPath }
}) {
  const id = getParamFromPathname(pathname, matchPath)

  const [draft, setDraft] = useState(state && state.draft)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (draft) return

    !id && setDraft({})

    id && /\w{20}/.test(id)
      ? firebaseWorker
          .fetchDraft(id)
          .then(draft => setDraft(draft))
          .catch(() => setHasError(true))
      : setHasError(true)
  }, [draft, id])

  return (
    <>
      <SEO title='Curate a Learning Collection' />
      <MobileHeader navIcon={<BackButton />} shadow title='Curate' />
      {!hasSignedIn() ? (
        <>
          {draft && <Curation draft={draft} id={id} />}
          {hasError && <>Recent + Create new</>}
        </>
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
