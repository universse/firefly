import React from 'react'
import PropTypes from 'prop-types'

export function Article ({ color, small }) {
  return (
    <svg
      aria-label='article'
      className={small ? 'feather feather--small' : 'feather'}
      role='img'
      stroke={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>article</title>
      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
      <path d='M14 2v6h6M16 13H8M16 17H8M10 9H8' />
    </svg>
  )
}

Article.defaultProps = {
  color: 'currentColor',
  small: true
}

Article.propTypes = {
  color: PropTypes.string,
  small: PropTypes.bool
}
