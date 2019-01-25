import React from 'react'

export function Code ({ color }) {
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
      aria-label='code'
      role='img'
    >
      <title>code</title>
      <polyline points='16 18 22 12 16 6' />
      <polyline points='8 6 2 12 8 18' />
    </svg>
  )
}

Code.defaultProps = {
  color: 'currentColor'
}
