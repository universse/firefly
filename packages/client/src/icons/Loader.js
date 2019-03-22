import React from 'react'

export function Loader ({ color }) {
  return (
    <svg
      aria-label='loader'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>loader</title>
      <line x1='12' x2='12' y1='2' y2='6' />
      <line x1='12' x2='12' y1='18' y2='22' />
      <line x1='4.93' x2='7.76' y1='4.93' y2='7.76' />
      <line x1='16.24' x2='19.07' y1='16.24' y2='19.07' />
      <line x1='2' x2='6' y1='12' y2='12' />
      <line x1='18' x2='22' y1='12' y2='12' />
      <line x1='4.93' x2='7.76' y1='19.07' y2='16.24' />
      <line x1='16.24' x2='19.07' y1='7.76' y2='4.93' />
    </svg>
  )
}

Loader.defaultProps = {
  color: 'currentColor'
}
