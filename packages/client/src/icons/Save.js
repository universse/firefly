import React from 'react'

export function Save ({ color, filled }) {
  const className = filled ? 'feather feather--filled' : 'feather'

  return (
    <svg
      aria-label='save'
      className={className}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>save</title>
      <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
    </svg>
  )
}

Save.defaultProps = {
  color: 'currentColor',
  filled: false
}
