import React from 'react'
import PropTypes from 'prop-types'

export function Save ({ color = 'currentColor', filled = false }) {
  const className = filled ? 'feather feather--filled' : 'feather'
  const label = filled ? 'unsave' : 'save'

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
      <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
    </svg>
  )
}

Save.propTypes = {
  color: PropTypes.string,
  filled: PropTypes.bool
}
