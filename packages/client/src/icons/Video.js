import React from 'react'

export function Video ({ color, small }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={small ? 'feather feather-small' : 'feather'}
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='video'
      role='img'
    >
      <title>video</title>
      <circle cx='12' cy='12' r='10' />
      <path d='M10 8l6 4-6 4V8z' />
    </svg>
  )
}

Video.defaultProps = {
  color: 'currentColor'
}
