import React from 'react'

export function ChevronRight ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
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
