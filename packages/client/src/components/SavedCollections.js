import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useSavedItemsReducer from 'hooks/useSavedItemsReducer'
import LocalStorage from 'constants/LocalStorage'

export const SavedCollectionsContext = createContext()

export default function SavedCollections ({ children }) {
  const savedCollectionsReducer = useSavedItemsReducer(
    LocalStorage.SAVED_COLLECTIONS
  )

  return (
    <SavedCollectionsContext.Provider value={savedCollectionsReducer}>
      {children}
    </SavedCollectionsContext.Provider>
  )
}

SavedCollections.propTypes = {
  children: PropTypes.node.isRequired
}
