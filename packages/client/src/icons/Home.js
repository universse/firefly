import React from 'react'
import PropTypes from 'prop-types'

export function Home ({ color }) {
  return (
    <svg
      aria-label='home'
      className='feather'
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>home</title>
      <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <path d='M9 22V12h6v10' />
    </svg>
  )
}

Home.defaultProps = {
  color: 'currentColor'
}

Home.propTypes = {
  color: PropTypes.string.isRequired
}
