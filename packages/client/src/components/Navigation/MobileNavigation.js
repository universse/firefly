import React from 'react'
import PropTypes from 'prop-types'

import { MobileNavLink } from './MobileNavLink'
import { Home, Search, Library, User } from 'assets/icons'

export default function MobileNavigation ({ isIndexPage }) {
  return (
    <nav className='MobileNavigation'>
      <ul>
        <li>
          <MobileNavLink
            Icon={Home}
            label='Home'
            onClick={e => isIndexPage && e.preventDefault()}
            partiallyActive={isIndexPage}
            to='/'
          />
        </li>
        <li>
          <MobileNavLink
            Icon={Search}
            label='Search'
            partiallyActive
            to='/search'
          />
        </li>
        <li>
          <MobileNavLink
            Icon={Library}
            label='My Library'
            partiallyActive
            to='/my-library'
          />
        </li>
        {/* <li
        >
          <MobileNavLink Icon={User} label='Profile' partiallyActive to='/me' />
        </li> */}
      </ul>
    </nav>
  )
}

MobileNavigation.propTypes = {
  isIndexPage: PropTypes.bool.isRequired
}
