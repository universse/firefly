import React from 'react'

import MobileNavigation from 'components/MobileNavigation'
import PropTypes from 'prop-types'

export default function Layout ({ children }) {
  return (
    <>
      {children}
      <MobileNavigation />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
