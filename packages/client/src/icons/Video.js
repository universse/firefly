import React from 'react'

export function Video ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
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
