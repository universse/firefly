import React, { useContext } from 'react'
import { ThemeContext } from '@emotion/core'

export function Logo ({ title }) {
  const theme = useContext(ThemeContext)

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      aria-label='logo'
      role='img'
    >
      <title>{title}</title>
      <circle
        cx='18'
        cy='18'
        r='15'
        stroke={theme.colors.brand500}
        strokeWidth='6'
      />
    </svg>
  )
}

Logo.defaultProps = {
  title: 'Firefly'
}
