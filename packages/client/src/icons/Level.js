import React, { useContext } from 'react'
import { ThemeContext } from '@emotion/core'

export function Level ({ level, small }) {
  const theme = useContext(ThemeContext)

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={small ? 'feather feather-small' : 'feather'}
      viewBox='0 0 24 24'
      aria-label='level'
      role='img'
    >
      <title>level</title>
      <path d='M14.5 22L14.5 6' stroke={theme.colors.brand500} />
      <path
        d='M19.5 22L19.5 2'
        stroke={level > 0 ? theme.colors.brand500 : theme.colors.gray400}
      />
      <path
        d='M9.5 22L9.5 10'
        stroke={level > 1 ? theme.colors.brand500 : theme.colors.gray400}
      />
      <path
        d='M4.5 22L4.5 14'
        stroke={level > 2 ? theme.colors.brand500 : theme.colors.gray400}
      />
    </svg>
  )
}

Level.defaultProps = {
  color: 'currentColor'
}
