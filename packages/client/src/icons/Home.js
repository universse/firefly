import React from 'react'

export function Home ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='home'
      role='img'
    >
      <title>home</title>
      <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <path d='M9 22V12h6v10' />
    </svg>
  )
}

Home.defaultProps = {
  color: 'currentColor'
}