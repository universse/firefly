import React from 'react'

export function ChevronRight ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='chevron right'
      role='img'
    >
      <title>chevron right</title>
      <path d='M9 18l6-6-6-6' />
    </svg>
  )
}

ChevronRight.defaultProps = {
  color: 'currentColor'
}
