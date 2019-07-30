import React from 'react'
import PropTypes from 'prop-types'

export function Remove ({ medium = false }) {
  return (
    <svg
      aria-label='remove'
      className={medium ? 'feather feather--medium' : 'feather'}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>remove</title>
      <path d='M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
    </svg>
  )
}

Remove.propTypes = {
  medium: PropTypes.bool
}
