import React from 'react'
import PropTypes from 'prop-types'

export function Code ({ color, small }) {
  return (
    <svg
      aria-label='code'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>code</title>
      <path d='M16 18l6-6-6-6M8 6l-6 6 6 6' />
    </svg>
  )
}

Code.defaultProps = {
  color: 'currentColor',
  small: true
}

Code.propTypes = {
  color: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired
}
