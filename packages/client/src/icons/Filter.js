import React from 'react'
import PropTypes from 'prop-types'

export function Filter ({ color = 'currentColor' }) {
  return (
    <svg
      aria-label='filter'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>filter</title>
      <path d='M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6' />
    </svg>
  )
}

Filter.propTypes = {
  color: PropTypes.string
}
