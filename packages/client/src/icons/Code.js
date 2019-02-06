import React from 'react'

export function Code ({ color, small }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={small ? 'feather feather-small' : 'feather'}
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='code'
      role='img'
    >
      <title>code</title>
      <path d='M16 18l6-6-6-6M8 6l-6 6 6 6' />
    </svg>
  )
}

Code.defaultProps = {
  color: 'currentColor'
}
