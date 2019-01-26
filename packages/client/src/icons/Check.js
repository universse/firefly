import React from 'react'

export function Check ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='check'
      role='img'
    >
      <title>check</title>
      <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
      <path d='M22 4L12 14.01l-3-3' />
    </svg>
  )
}

Check.defaultProps = {
  color: 'currentColor'
}
