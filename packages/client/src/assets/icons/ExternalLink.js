import React from 'react'
import PropTypes from 'prop-types'

export function ExternalLink ({ color = 'currentColor', small = true }) {
  return (
    <svg
      aria-label='external link'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>external link</title>
      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3' />
    </svg>
  )
}

ExternalLink.propTypes = {
  color: PropTypes.string,
  small: PropTypes.bool
}
