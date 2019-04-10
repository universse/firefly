import React from 'react'
import PropTypes from 'prop-types'

export function User ({ color }) {
  return (
    <svg
      aria-label='user'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>user</title>
      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  )
}

User.defaultProps = {
  color: 'currentColor'
}

User.propTypes = {
  color: PropTypes.string
}
