import React, { useContext } from 'react'
import { ThemeContext } from '@emotion/core'

export function Level ({ level, small }) {
  const theme = useContext(ThemeContext)

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 17 17'
      aria-label='level'
      role='img'
      height='17'
      width='17'
      strokeWidth='2'
      strokeLinejoin='round'
    >
      <title>level</title>
      <path d='M1 19L1 12' stroke={theme.colors.brand500} />
      <path
        d='M6 19L6 8'
        stroke={level > 0 ? theme.colors.brand500 : theme.colors.gray400}
      />
      <path
        d='M11 19L11 4'
        stroke={level > 1 ? theme.colors.brand500 : theme.colors.gray400}
      />
      <path
        d='M16 19L16 0'
        stroke={level > 2 ? theme.colors.brand500 : theme.colors.gray400}
      />
    </svg>
  )
}

Level.defaultProps = {
  color: 'currentColor'
}
