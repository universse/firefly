import React, { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

import { getSavedCollections, saveCollections } from 'services/localforage'

function reducer (state, { type, payload }) {
  switch (type) {
    case 'load':
      return payload || {}

    case 'saveClick':
      if (state[payload.id]) {
        const newState = { ...state }
        delete newState[payload.id]
        return newState
      }
      return { ...state, [payload.id]: payload }

    default:
      return state
  }
}

export const SavedCollectionsContext = createContext()

export default function SavedCollections ({ children }) {
  const savedCollectionsReducer = useReducer(reducer, {})
  const [collectionsToSave, dispatch] = savedCollectionsReducer

  useEffect(() => {
    getSavedCollections().then(value =>
      dispatch({ type: 'load', payload: value })
    )

    const save = () => saveCollections(collectionsToSave)

    window.addEventListener('beforeunload', save)
    return () => {
      window.removeEventListener('beforeunload', save)
    }
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
