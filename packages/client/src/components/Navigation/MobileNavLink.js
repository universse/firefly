import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export function MobileNavLink ({ label, Icon, ...props }) {
  return (
    <Link activeClassName='active' {...props}>
      <div>
        <Icon />
      </div>
      <span>{label}</span>
    </Link>
  )
}

MobileNavLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired
}
