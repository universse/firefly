import React from 'react'

export function Heart ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='heart'
      role='img'
    >
      <title>heart</title>
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
    </svg>
  )
}

Heart.defaultProps = {
  color: 'currentColor'
}
