import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const NormalizedCollectionsContext = createContext()

export default function NormalizedCollections ({ children, location }) {
  const normalizedCollectionsState = useState()

  return (
    <NormalizedCollectionsContext.Provider value={normalizedCollectionsState}>
      {children}
    </NormalizedCollectionsContext.Provider>
  )
}

NormalizedCollections.propTypes = {
  children: PropTypes.node.isRequired
}
