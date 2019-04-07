import React from 'react'
import PropTypes from 'prop-types'

export function ChevronDown ({ color }) {
  return (
    <svg
      aria-label='chevron down'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>chevron down</title>
      <path d='M6 9l6 6 6-6' />
    </svg>
  )
}

ChevronDown.defaultProps = {
  color: 'currentColor'
}

ChevronDown.propTypes = {
  color: PropTypes.string.isRequired
}
