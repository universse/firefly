import React, { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'
import reducer from './reducer'

export const SavedCollectionsContext = createContext()

const initialState = {}

export default function SavedCollections ({ children }) {
  const savedCollectionsReducer = useReducer(reducer, initialState)
  const [, dispatch] = savedCollectionsReducer

  useEffect(() => {
    localforage
      .getItem(LocalStorage.SAVED_COLLECTIONS)
      .then(value => value && dispatch({ type: 'load', payload: value }))
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
