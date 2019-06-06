import React from 'react'
import PropTypes from 'prop-types'

export function Heart ({ color = 'currentColor', filled = false }) {
  const className = filled ? 'feather feather--filled' : 'feather'
  const label = filled ? 'unlove' : 'love'

  return (
    <svg
      aria-label={label}
      className={className}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>{label}</title>
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
    </svg>
  )
}

Heart.propTypes = {
  color: PropTypes.string,
  filled: PropTypes.bool
}
