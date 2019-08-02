import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Icon from 'assets/icons'

export function MobileNavLink ({ label, icon, ...props }) {
  return (
    <Link activeClassName='active' {...props}>
      <div>
        <Icon icon={icon} />
      </div>
      <span>{label}</span>
    </Link>
  )
}

MobileNavLink.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
