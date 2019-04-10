import React from 'react'
import PropTypes from 'prop-types'

export function Podcast ({ color, small }) {
  return (
    <svg
      aria-label='podcast'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>podcast</title>
      <path d='M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07' />
    </svg>
  )
}

Podcast.defaultProps = {
  color: 'currentColor',
  small: true
}

Podcast.propTypes = {
  color: PropTypes.string,
  small: PropTypes.bool
}
