import React, { createContext, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { AllCollectionsContext } from 'contexts/AllCollections'
import worker from './worker'

export const NormalizedCollectionsContext = createContext()

export default function NormalizedCollections ({ children, location }) {
  const [normalizedCollections, setNormalizedCollections] = useState()
  const allCollections = useContext(AllCollectionsContext)

  useEffect(() => {
    worker.normalizeCollections(allCollections).then(setNormalizedCollections)
  }, [allCollections])

  return (
    <NormalizedCollectionsContext.Provider value={normalizedCollections}>
      {children}
    </NormalizedCollectionsContext.Provider>
  )
}

NormalizedCollections.propTypes = {
  children: PropTypes.node.isRequired
}
