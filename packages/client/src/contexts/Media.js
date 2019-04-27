import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useMedia from 'hooks/useMedia'
import { media } from 'constants/Styles'

export const MediaContext = createContext()

function renderChildren (isDesktop, children) {
  if (typeof isDesktop !== 'boolean') {
    return null
  }

  return typeof children === 'object' ? children : children(isDesktop)
}

export default function Media ({ children }) {
  const isDesktop = useMedia(media.desktop)

  return (
    <MediaContext.Provider value={isDesktop}>
      {renderChildren(isDesktop, children)}
    </MediaContext.Provider>
  )
}

Media.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
}
