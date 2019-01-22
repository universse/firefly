import React from 'react'

export function Cross ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      viewBox='0 0 24 24'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-label='cross'
      role='img'
    >
      <title>cross</title>
      <path d='M18 6L6 18M6 6l12 12' />
    </svg>
  )
}

Cross.defaultProps = {
  color: '#000'
}
