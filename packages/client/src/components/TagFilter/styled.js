import React from 'react'
import { css } from '@emotion/core'

export function ClearFilterButton (props) {
  return (
    <button
      css={theme => css`
        color: ${theme.colors.gray700};
        font-size: 0.875rem;
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
        color: ${isActive ? theme.colors.white : theme.colors.gray700};
        display: block;
        font-size: 1rem;
        font-weight: 600;
        line-height: 2rem;
        padding: 0 1rem;
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
        border-bottom: 2px solid transparent;
        color: ${theme.colors.gray900};
        display: block;
        font-size: 1rem;
        font-weight: ${isActive ? 700 : 400};

        &:hover {
          border-bottom: 2px solid
            ${isActive ? theme.colors.gray900 : theme.colors.brand500};
          color: ${isActive ? theme.colors.gray900 : theme.colors.brand500};
        }
      `}
      {...props}
    />
  )
}
