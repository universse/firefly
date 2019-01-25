import React from 'react'

export function Course ({ color }) {
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
      aria-label='course'
      role='img'
    >
      <title>course</title>
      <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
      <line x1='8' y1='21' x2='16' y2='21' />
      <line x1='12' y1='17' x2='12' y2='21' />
    </svg>
  )
}

Course.defaultProps = {
  color: 'currentColor'
}
