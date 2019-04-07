import React from 'react'
import PropTypes from 'prop-types'

export function ChevronRight ({ color }) {
  return (
    <svg
      aria-label='chevron right'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>chevron right</title>
      <path d='M9 18l6-6-6-6' />
    </svg>
  )
}

ChevronRight.defaultProps = {
  color: 'currentColor'
}

ChevronRight.propTypes = {
  color: PropTypes.string.isRequired
}
