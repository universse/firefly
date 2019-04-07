import React from 'react'
import PropTypes from 'prop-types'

export function Move ({ color }) {
  return (
    <svg
      aria-label='move'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>move</title>
      <path d='M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20' />
    </svg>
  )
}

Move.defaultProps = {
  color: 'currentColor'
}

Move.propTypes = {
  color: PropTypes.string.isRequired
}
