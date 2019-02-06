import React from 'react'

export function Back ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='back'
      role='img'
    >
      <title>back</title>
      <path d='M19 12H5M12 19l-7-7 7-7' />
    </svg>
  )
}

Back.defaultProps = {
  color: 'currentColor'
}
