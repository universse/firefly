import React from 'react'
import PropTypes from 'prop-types'

export function Edit ({ medium = false }) {
  return (
    <svg
      aria-label='edit'
      className={medium ? 'feather feather--medium' : 'feather'}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>edit</title>
      <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
      <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
    </svg>
  )
}

Edit.propTypes = {
  medium: PropTypes.bool
}
