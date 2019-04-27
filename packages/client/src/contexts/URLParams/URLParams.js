import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useURLParams from './useURLParams'

export const URLParamsContext = createContext()

export default function URLParams ({ children, location }) {
  const value = useURLParams(location)

  return (
    <URLParamsContext.Provider value={value}>
      {children}
    </URLParamsContext.Provider>
  )
}

URLParams.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
}
