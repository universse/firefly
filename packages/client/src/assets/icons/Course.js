import React from 'react'
import PropTypes from 'prop-types'

export function Course ({ small = true }) {
  return (
    <svg
      aria-label='course'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>course</title>
      <rect height='14' rx='2' ry='2' width='20' x='2' y='3' />
      <path d='M8 21h8M12 17v4' />
    </svg>
  )
}

Course.propTypes = {
  small: PropTypes.bool
}