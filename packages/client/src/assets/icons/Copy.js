import React from 'react'
import PropTypes from 'prop-types'

export function Copy ({ medium = true }) {
  return (
    <svg
      aria-label='copy'
      className={medium ? 'feather feather--medium' : 'feather'}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>copy</title>
      <path d='M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3M8 12h8' />
    </svg>
  )
}

Copy.propTypes = {
  medium: PropTypes.bool
}
