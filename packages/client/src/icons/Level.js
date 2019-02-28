import React, { useContext } from 'react'
import { ThemeContext } from '@emotion/core'

export function Level ({ level, small }) {
  const theme = useContext(ThemeContext)

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 21 20'
      aria-label='level'
      role='img'
      height='20'
      width='21'
      strokeWidth='3'
      strokeLinejoin='round'
    >
      <title>level</title>
      <path d='M1.5 19L1.5 12' stroke={theme.colors.brand500} />
      <path
        d='M7.5 19L7.5 8'
        stroke={level > 0 ? theme.colors.brand500 : theme.colors.gray400}
      />
      <path
        d='M13.5 19L13.5 4'
        stroke={level > 1 ? theme.colors.brand500 : theme.colors.gray400}
      />
      <path
        d='M19.5 19L19.5 0'
        stroke={level > 2 ? theme.colors.brand500 : theme.colors.gray400}
      />
    </svg>
  )
}

Level.defaultProps = {
  color: 'currentColor'
}
