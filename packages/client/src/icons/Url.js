import React from 'react'
import PropTypes from 'prop-types'

export function Url ({ color, small }) {
  return (
    <svg
      aria-label='url'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>url</title>
      <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
      <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
    </svg>
  )
}

Url.defaultProps = {
  color: 'currentColor',
  small: false
}

Url.propTypes = {
  color: PropTypes.string,
  small: PropTypes.bool
}
