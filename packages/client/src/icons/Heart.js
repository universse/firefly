import React from 'react'

export function Heart ({ color, filled }) {
  const className = filled ? 'feather feather--filled' : 'feather'

  return (
    <svg
      aria-label='heart'
      className={className}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>heart</title>
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
    </svg>
  )
}

Heart.defaultProps = {
  color: 'currentColor',
  filled: false
}
