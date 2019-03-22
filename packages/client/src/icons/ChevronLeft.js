import React from 'react'

export function ChevronLeft ({ color }) {
  return (
    <svg
      aria-label='chevron left'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>chevron left</title>
      <path d='M15 18l-6-6 6-6' />
    </svg>
  )
}

ChevronLeft.defaultProps = {
  color: 'currentColor'
}
