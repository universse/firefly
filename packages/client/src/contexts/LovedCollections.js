import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useSavedItemsReducer from 'hooks/useSavedItemsReducer'
import LocalStorage from 'constants/LocalStorage'

export const LovedCollectionsContext = createContext()

export default function LovedCollections ({ children }) {
  const lovedCollectionsReducer = useSavedItemsReducer(
    LocalStorage.LOVED_COLLECTIONS,
    true
  )

  return (
    <LovedCollectionsContext.Provider value={lovedCollectionsReducer}>
      {children}
    </LovedCollectionsContext.Provider>
  )
}

LovedCollections.propTypes = {
  children: PropTypes.node.isRequired
}
