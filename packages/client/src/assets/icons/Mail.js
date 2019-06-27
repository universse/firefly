import React from 'react'
import PropTypes from 'prop-types'

export function Mail ({ medium = true }) {
  return (
    <svg
      aria-label='mail'
      className={medium ? 'feather feather--medium' : 'feather'}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>mail</title>
      <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
      <path d='M22 6l-10 7L2 6' />
    </svg>
  )
}

Mail.propTypes = {
  medium: PropTypes.bool
}
