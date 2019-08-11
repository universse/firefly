import React from 'react'
import PropTypes from 'prop-types'

import { MobileNavLink } from './MobileNavLink'

export default function MobileNavigation ({ isIndexPage }) {
  return (
    <nav className='MobileNavigation bottom'>
      <ul>
        <li>
          <MobileNavLink
            icon='home'
            label='Home'
            onClick={e => isIndexPage && e.preventDefault()}
            partiallyActive={isIndexPage}
            to='/'
          />
        </li>
        <li>
          <MobileNavLink
            icon='search'
            label='Search'
            partiallyActive
            to='/search'
          />
        </li>
        <li>
          <MobileNavLink
            icon='library'
            label='My Library'
            partiallyActive
            to='/my-library'
          />
        </li>
        {/* <li
        >
          <MobileNavLink icon='user' label='Profile' partiallyActive to='/me' />
        </li> */}
      </ul>
    </nav>
  )
}

MobileNavigation.propTypes = {
  isIndexPage: PropTypes.bool.isRequired
}
