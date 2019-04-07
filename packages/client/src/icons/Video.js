import React from 'react'
import PropTypes from 'prop-types'

export function Video ({ color, small }) {
  return (
    <svg
      aria-label='video'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>video</title>
      <circle cx='12' cy='12' r='10' />
      <path d='M10 8l6 4-6 4V8z' />
    </svg>
  )
}

Video.defaultProps = {
  color: 'currentColor',
  small: true
}

Video.propTypes = {
  color: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired
}
