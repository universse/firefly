import React from 'react'

export function Logo ({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      aria-label='logo'
      role='img'
    >
      <title>logo</title>
      <circle cx='18' cy='18' r='15' stroke={color} strokeWidth='6' />
    </svg>
  )
}

Logo.defaultProps = {
  color: '#d70d37'
}
