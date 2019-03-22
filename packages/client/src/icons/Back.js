import React from 'react'

export function Back ({ color }) {
  return (
    <svg
      aria-label='back'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>back</title>
      <path d='M19 12H5M12 19l-7-7 7-7' />
    </svg>
  )
}

Back.defaultProps = {
  color: 'currentColor'
}
