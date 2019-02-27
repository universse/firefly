import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useMedia from 'hooks/useMedia'
import { media } from 'constants/Theme'

export const MediaContext = createContext()

export default function Media ({ children }) {
  const isDesktop = useMedia(media.desktop)

  return (
    <MediaContext.Provider value={isDesktop}>
      {isDesktop !== undefined && children}
    </MediaContext.Provider>
  )
}

Media.propTypes = {
  children: PropTypes.node.isRequired
}
