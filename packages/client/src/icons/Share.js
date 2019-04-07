import React from 'react'
import PropTypes from 'prop-types'

export function Share ({ color }) {
  return (
    <svg
      aria-label='share'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>share</title>
      <circle cx='18' cy='5' r='3' />
      <circle cx='6' cy='12' r='3' />
      <circle cx='18' cy='19' r='3' />
      <line x1='8.59' x2='15.42' y1='13.51' y2='17.49' />
      <line x1='15.41' x2='8.59' y1='6.51' y2='10.49' />
    </svg>
  )
}

Share.defaultProps = {
  color: 'currentColor'
}

Share.propTypes = {
  color: PropTypes.string.isRequired
}
