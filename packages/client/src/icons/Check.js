import React from 'react'
import PropTypes from 'prop-types'

export function Check ({ filled }) {
  const label = filled ? 'uncheck' : 'check'

  return (
    <svg
      aria-label={label}
      className='feather'
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>{label}</title>
      <path
        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
        fill={filled ? 'var(--colors-success)' : 'none'}
        stroke={filled ? 'none' : 'var(--colors-gray400)'}
      />
      <path
        d='M17.3334 9L10.0001 16.3333L6.66675 13'
        stroke={filled ? '#fff' : 'var(--colors-gray400)'}
      />
    </svg>
  )
}

Check.defaultProps = {
  filled: false
}

Check.propTypes = {
  filled: PropTypes.bool
}
