import React from 'react'

export function Notification ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='feather'
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='notification'
      role='img'
    >
      <title>notification</title>
      <path d='M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0' />
    </svg>
  )
}

Notification.defaultProps = {
  color: 'currentColor'
}
