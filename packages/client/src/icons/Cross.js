import React from 'react'
import PropTypes from 'prop-types'

export function Cross ({ color, small }) {
  return (
    <svg
      aria-label='cross'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>cross</title>
      <path d='M18 6L6 18M6 6l12 12' />
    </svg>
  )
}

Cross.defaultProps = {
  color: 'currentColor',
  small: false
}

Cross.propTypes = {
  color: PropTypes.string,
  small: PropTypes.bool
}
