import React from 'react'
import PropTypes from 'prop-types'

import { URLQueryContext } from './URLQuery'
import { URLUtilsContext } from './URLUtils'
import useQuery from 'hooks/useQuery'
import useURLUtils from 'hooks/useURLUtils'

export default function URLParams ({ children, pathname, search }) {
  const [queryValues, dispatch] = useQuery(search)
  const urlUtils = useURLUtils(queryValues, pathname, dispatch)

  return (
    <URLQueryContext.Provider value={queryValues}>
      <URLUtilsContext.Provider value={urlUtils}>
        {children}
      </URLUtilsContext.Provider>
    </URLQueryContext.Provider>
  )
}

URLParams.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired
}
