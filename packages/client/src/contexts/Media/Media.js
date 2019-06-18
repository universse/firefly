import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useMedia from './useMedia'
import { media } from 'constants/Styles'

export const MediaContext = createContext()

export default function Media ({ children }) {
  const isDesktop = useMedia(media.desktop)

  return (
    <MediaContext.Provider value={isDesktop}>
      {typeof isDesktop === 'boolean' && children}
    </MediaContext.Provider>
  )
}

Media.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
}
