import React, { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

import { getSavedCollections } from 'services/localforage'
import reducer from './reducer'

export const SavedCollectionsContext = createContext()

export default function SavedCollections ({ children }) {
  const savedCollectionsReducer = useReducer(reducer)
  const [, dispatch] = savedCollectionsReducer

  useEffect(() => {
    getSavedCollections().then(value =>
      dispatch({ type: 'load', payload: value })
    )
  }, [])

  return (
    <SavedCollectionsContext.Provider value={savedCollectionsReducer}>
      {children}
    </SavedCollectionsContext.Provider>
  )
}

SavedCollections.propTypes = {
  children: PropTypes.node.isRequired
}
