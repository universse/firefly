import React from 'react'
import PropTypes from 'prop-types'

export function Delete ({ color }) {
  return (
    <svg
      aria-label='save'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>save</title>
      <path d='M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
    </svg>
  )
}

Delete.defaultProps = {
  color: 'currentColor'
}

Delete.propTypes = {
  color: PropTypes.string
}
