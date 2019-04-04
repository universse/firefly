import React from 'react'

export function Cross ({ color }) {
  return (
    <svg
      aria-label='cross'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>cross</title>
      <path d='M18 6L6 18M6 6l12 12' />
    </svg>
  )
}

Cross.defaultProps = {
  color: 'currentColor'
}
