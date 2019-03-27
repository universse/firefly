import React from 'react'

export function Tag ({ color, small }) {
  return (
    <svg
      aria-label='tag'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>tag</title>
      <path d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z' />
      <line x1='7' x2='7' y1='7' y2='7' />
    </svg>
  )
}

Tag.defaultProps = {
  color: 'currentColor'
}
