import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NormalizedCollectionsPath } from 'common'

export const NormalizedCollectionsContext = createContext()

export default function NormalizedCollections ({ children }) {
  const [normalizedCollections, setNormalizedCollections] = useState()

  useEffect(() => {
    fetch(NormalizedCollectionsPath)
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
