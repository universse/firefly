import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const NormalizedCollectionsContext = createContext()

export default function NormalizedCollections ({ children }) {
  const [normalizedCollections, setNormalizedCollections] = useState()

  useEffect(() => {
    fetch('/data/mivEB3GnRswZyWZMNkaO.json')
      .then(res => res.json())
      .then(setNormalizedCollections)
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
