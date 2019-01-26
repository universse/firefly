import React from 'react'

export function Podcast ({ color, small }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={small ? 'feather feather-small' : 'feather'}
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='podcast'
      role='img'
    >
      <title>podcast</title>
      <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5' />
      <path d='M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07' />
    </svg>
  )
}

Podcast.defaultProps = {
  color: 'currentColor'
}
