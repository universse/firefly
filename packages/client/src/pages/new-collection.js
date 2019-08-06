import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

import CollectionTemplate from 'components/CollectionTemplate'
import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import firebaseWorker from 'utils/firebaseWorker'
import { getParamFromPathname } from 'utils/pathnameUtils'
import { createCollectionPath } from '../../gatsby/utils'

export default function NewCollectionPage ({
  location,
  pageContext: { matchPath }
}) {
  const { pathname, state } = location

  const id = getParamFromPathname(pathname, matchPath)
  const normalizedCollections = useContext(NormalizedCollectionsContext)

  const [collection, setCollection] = useState(state && state.collection)
  const [isLoading, setIsLoading] = useState(!collection)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!normalizedCollections || collection) {
      return
    }

    if (normalizedCollections[id]) {
      const { name } = normalizedCollections[id]
      navigate(createCollectionPath({ id, name }), { replace: true })
      return
    }

    firebaseWorker
      .fetchCollection(id)
      .then(setCollection)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [collection, id, normalizedCollections])

  return (
    <>
      {collection && (
        <CollectionTemplate
          data={{ collections: collection }}
          location={location}
        />
      )}
    </>
  )
}

NewCollectionPage.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    matchPath: PropTypes.string.isRequired
  }).isRequired
}
