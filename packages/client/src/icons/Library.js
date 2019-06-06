import React from 'react'
import PropTypes from 'prop-types'

export function Library ({ color = 'currentColor' }) {
  return (
    <svg
      aria-label='library'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>library</title>
      <line x1='8' x2='21' y1='6' y2='6' />
      <line x1='8' x2='21' y1='12' y2='12' />
      <line x1='8' x2='21' y1='18' y2='18' />
      <line x1='3' x2='3' y1='6' y2='6' />
      <line x1='3' x2='3' y1='12' y2='12' />
      <line x1='3' x2='3' y1='18' y2='18' />
    </svg>
  )
}

Library.propTypes = {
  color: PropTypes.string
}
