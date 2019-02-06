import React from 'react'

export function Article ({ color, small }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={small ? 'feather feather-small' : 'feather'}
      viewBox='0 0 24 24'
      stroke={color}
      aria-label='article'
      role='img'
    >
      <title>article</title>
      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
      <path d='M14 2v6h6M16 13H8M16 17H8M10 9H8' />
    </svg>
  )
}

Article.defaultProps = {
  color: 'currentColor'
}
