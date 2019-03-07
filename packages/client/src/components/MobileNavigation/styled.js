import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { mobileNavigationHeightInRem } from 'utils/styles'

export function NavLink ({ isActive, label, Icon, ...props }) {
  return (
    <Link
      css={theme => css`
        align-items: center;
        color: ${isActive ? theme.colors.brand500 : theme.colors.gray500};
        display: flex;
        flex-direction: column;
        height: ${mobileNavigationHeightInRem}rem;
        padding: 0.5rem 0 0.5rem;
      `}
      {...props}
    >
      <div
        css={css`
          margin-bottom: 0.25rem;
        `}
      >
        <Icon />
      </div>
      <span
        css={css`
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        `}
      >
        {label}
      </span>
    </Link>
  )
}
