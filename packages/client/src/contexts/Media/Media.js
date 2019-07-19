import React, { createContext, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import useMedia from './useMedia'
import { media } from 'constants/Styles'

export const MediaContext = createContext()

export default function Media ({ children }) {
  const isDesktop = useMedia(media.desktop)
  const isMobile = useMedia(media.mobile)

  useEffect(() => {
    window.___isDesktop = isDesktop
  }, [isDesktop])

  const value = useMemo(
    () => ({
      isDesktop,
      isMobile
    }),
    [isDesktop, isMobile]
  )

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
}

Media.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
}
