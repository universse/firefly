import React from 'react'
import PropTypes from 'prop-types'

export function Search ({ color = 'currentColor' }) {
  return (
    <svg
      aria-label='search'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>search</title>
      <circle cx='11' cy='11' r='8' />
      <path d='M21 21l-4.35-4.35' />
    </svg>
  )
}

Search.propTypes = {
  color: PropTypes.string
}
