import React from 'react'
import PropTypes from 'prop-types'

export function Notification ({ color }) {
  return (
    <svg
      aria-label='notification'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>notification</title>
      <path d='M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0' />
    </svg>
  )
}

Notification.defaultProps = {
  color: 'currentColor'
}

Notification.propTypes = {
  color: PropTypes.string
}
