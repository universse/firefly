import React from 'react'

export function Move ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='move'
      role='img'
    >
      <title>move</title>
      <path d='M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20' />
    </svg>
  )
}

Move.defaultProps = {
  color: 'currentColor'
}
