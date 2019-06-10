import React from 'react'
import PropTypes from 'prop-types'

export default function IconButton ({
  as: Tag = 'button',
  light = false,
  ...props
}) {
  const className = light ? 'IconButton light' : 'IconButton'

  return (
    <Tag
      className={className}
      {...Tag === 'button' && { type: 'button' }}
      {...props}
    />
  )
}

IconButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  as: PropTypes.oneOf(['button', 'summary']),
  light: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string
}
