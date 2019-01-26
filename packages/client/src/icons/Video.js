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
      <polygon points='10 8 16 12 10 16 10 8' />
    </svg>
  )
}

Video.defaultProps = {
  color: 'currentColor'
}
