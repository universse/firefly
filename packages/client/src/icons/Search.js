import React from 'react'

export function Search ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='search'
      role='img'
    >
      <title>search</title>
      <circle cx='11' cy='11' r='8' />
      <path d='M21 21l-4.35-4.35' />
    </svg>
  )
}

Search.defaultProps = {
  color: 'currentColor'
}
