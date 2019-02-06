import React from 'react'

export function Course ({ color, small }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={small ? 'feather feather-small' : 'feather'}
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='course'
      role='img'
    >
      <title>course</title>
      <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
      <path d='M8 21h8M12 17v4' />
    </svg>
  )
}

Course.defaultProps = {
  color: 'currentColor'
}
