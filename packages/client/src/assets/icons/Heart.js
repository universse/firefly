import React from 'react'
import PropTypes from 'prop-types'

export function Heart ({ filled = false, large = false }) {
  const label = filled ? 'unlove' : 'love'
  let className = 'feather'
  filled && (className += ' feather--filled')
  large && (className += ' feather--large')

  return (
    <svg
      aria-label={label}
      className={className}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>{label}</title>
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
    </svg>
  )
}

Heart.propTypes = {
  filled: PropTypes.bool,
  large: PropTypes.bool
}
