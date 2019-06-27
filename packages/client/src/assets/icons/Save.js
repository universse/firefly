import React from 'react'
import PropTypes from 'prop-types'

export function Save ({ filled = false, medium = false }) {
  const label = filled ? 'unsave' : 'save'
  let className = 'feather'
  filled && (className += ' feather--filled')
  medium && (className += ' feather--medium')

  return (
    <svg
      aria-label={label}
      className={className}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>{label}</title>
      <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
    </svg>
  )
}

Save.propTypes = {
  filled: PropTypes.bool,
  medium: PropTypes.bool
}
