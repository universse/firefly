import React from 'react'

export function ChevronDown ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='chevron down'
      role='img'
    >
      <title>chevron down</title>
      <path d='M6 9l6 6 6-6' />
    </svg>
  )
}

ChevronDown.defaultProps = {
  color: 'currentColor'
}
