import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { createCollectionPath } from '@firefly/core'

import CollectionTemplate from 'components/CollectionTemplate'
import { useNormalizedCollections } from 'hooks/useGlobalStore'
import firebaseWorker from 'utils/firebaseWorker'
import { getParamFromPathname } from 'utils/pathnameUtils'

export default function NewCollectionPage ({
  location,
  pageContext: { matchPath }
}) {
  const { pathname, state } = location

  const id = getParamFromPathname(pathname, matchPath)
  const normalizedCollections = useNormalizedCollections()

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
