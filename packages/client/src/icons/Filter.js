import React from 'react'

export function Filter ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='filter'
      role='img'
    >
      <title>filter</title>
      <path d='M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6' />
    </svg>
  )
}

Filter.defaultProps = {
  color: 'currentColor'
}
