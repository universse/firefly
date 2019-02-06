import React from 'react'

export function Library ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='library'
      role='img'
    >
      <title>library</title>
      <line x1='8' y1='6' x2='21' y2='6' />
      <line x1='8' y1='12' x2='21' y2='12' />
      <line x1='8' y1='18' x2='21' y2='18' />
      <line x1='3' y1='6' x2='3' y2='6' />
      <line x1='3' y1='12' x2='3' y2='12' />
      <line x1='3' y1='18' x2='3' y2='18' />
    </svg>
  )
}

Library.defaultProps = {
  color: 'currentColor'
}
