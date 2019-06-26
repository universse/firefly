import React from 'react'
import PropTypes from 'prop-types'

export function Resources ({ color = 'currentColor', small = true }) {
  return (
    <svg
      aria-label='resources'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>resources</title>
      <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
    </svg>
  )
}

Resources.propTypes = {
  color: PropTypes.string,
  small: PropTypes.bool
}
