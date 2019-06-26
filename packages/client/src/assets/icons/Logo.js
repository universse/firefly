import React from 'react'

import useSiteTitle from 'hooks/useSiteTitle'

export function Logo () {
  const title = useSiteTitle()

  return (
    <svg
      aria-label='logo'
      fill='none'
      height='36'
      role='img'
      viewBox='0 0 36 36'
      width='36'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>{title}</title>
      <circle cx='18' cy='18' r='15' stroke='var(--brand500)' strokeWidth='6' />
    </svg>
  )
}
