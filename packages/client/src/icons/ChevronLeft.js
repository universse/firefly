import React from 'react'

export function ChevronLeft ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='chevron left'
      role='img'
    >
      <title>chevron left</title>
      <path d='M15 18l-6-6 6-6' />
    </svg>
  )
}

ChevronLeft.defaultProps = {
  color: 'currentColor'
}
