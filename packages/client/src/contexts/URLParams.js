import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useQuery from 'hooks/useQuery'

export const URLParamsContext = createContext()

export default function URLParams ({
  children,
  location: { pathname, search }
}) {
  const value = useQuery(pathname, search)

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
