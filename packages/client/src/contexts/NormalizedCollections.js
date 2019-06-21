import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import searchWorker from 'utils/searchWorker'

export const NormalizedCollectionsContext = createContext()

export default function NormalizedCollections ({ children }) {
  const [normalizedCollections, setNormalizedCollections] = useState()

  useEffect(() => {
    searchWorker.init().then(setNormalizedCollections)
  }, [])

  return (
    <NormalizedCollectionsContext.Provider value={normalizedCollections}>
      {children}
    </NormalizedCollectionsContext.Provider>
  )
}

NormalizedCollections.propTypes = {
  children: PropTypes.node.isRequired
}
