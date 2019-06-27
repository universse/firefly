import React from 'react'
import PropTypes from 'prop-types'

export function Book ({ small = true }) {
  return (
    <svg
      aria-label='book'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>book</title>
      <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
      <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
    </svg>
  )
}

Book.propTypes = {
  small: PropTypes.bool
}
