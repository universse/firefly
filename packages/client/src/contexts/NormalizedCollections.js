import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NormalizedCollectionsFilename } from 'common'

export const NormalizedCollectionsContext = createContext()

export default function NormalizedCollections ({ children }) {
  const [normalizedCollections, setNormalizedCollections] = useState()

  useEffect(() => {
    import(/* webpackMode: "eager" */ `data/${NormalizedCollectionsFilename}.json`).then(
      ({ default: data }) => setNormalizedCollections(data)
    )
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
