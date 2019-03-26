import React from 'react'
import { css } from '@emotion/core'

export function ClearFilterButton (props) {
  return (
    <button
      css={theme => css`
        color: ${theme.colors.gray700};
        font-size: 0.875rem;

        &:hover {
          color: ${theme.colors.gray900};
          text-decoration: underline;
        }
      `}
      type='button'
      {...props}
    />
  )
}

export function Count ({ isActive, ...props }) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.gray900};
        font-size: 1rem;

        ${theme.screens.nonDesktop} {
          color: inherit;
          font-size: inherit;
          margin-left: 0.75rem;
        }

        ${theme.screens.desktop} {
          font-weight: ${isActive ? 700 : 400};
        }
      `}
      {...props}
    />
  )
}

export function MobileTag ({ isActive, ...props }) {
  return (
    // eslint-disable-next-line
    <a
      css={theme => css`
        background-color: ${isActive
          ? theme.colors.gray900
          : theme.colors.gray300};
        border-radius: 1rem;
        color: ${isActive ? theme.colors.white900 : theme.colors.gray900};
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 2rem;
        padding: 0 0.75rem;
      `}
      {...props}
    />
  )
}

export function Tag ({ isActive, ...props }) {
  return (
    // eslint-disable-next-line
    <a
      css={theme => css`
        color: ${theme.colors.gray900};
        display: block;
        font-size: 1rem;
        font-weight: ${isActive ? 700 : 400};
        height: 1.25rem;

        &:hover {
          color: ${isActive ? theme.colors.gray900 : theme.colors.brand500};
        }
      `}
      {...props}
    />
  )
}
