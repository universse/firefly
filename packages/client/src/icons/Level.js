import React, { useContext } from 'react'
import { ThemeContext } from '@emotion/core'

export function Level ({ level, small }) {
  const theme = useContext(ThemeContext)

  return (
    <svg
      aria-label='level'
      height='17'
      role='img'
      strokeLinejoin='round'
      strokeWidth='3'
      viewBox='0 0 21 17'
      width='21'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>level</title>
      <path d='M1.5 17V9' stroke={theme.colors.brand500} />
      <path
        d='M7.5 17V6'
        stroke={level > 0 ? theme.colors.brand500 : theme.colors.gray400}
      />
      <path
        d='M13.5 17V3'
        stroke={level > 1 ? theme.colors.brand500 : theme.colors.gray400}
      />
      <path
        d='M19.5 17V0'
        stroke={level > 2 ? theme.colors.brand500 : theme.colors.gray400}
      />
    </svg>
  )
}

Level.defaultProps = {
  color: 'currentColor'
}
