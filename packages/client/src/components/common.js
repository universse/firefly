import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

export function Category (props) {
  return (
    <Link
      css={theme => css`
        color: ${theme.colors.brand500};
        font-size: 0.875rem;
        text-transform: uppercase;
        font-weight: 700;
        z-index: 1;
      `}
      {...props}
    />
  )
}

export function Difficulty (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.gray700};
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: capitalize;
      `}
      {...props}
    />
  )
}

export function Heading ({ as, serif, ...props }) {
  const Tag = as || 'h1'
  return (
    <Tag
      css={css`
        font-size: 1rem;
        font-weight: 2rem;
      `}
      {...props}
    />
  )
}

export function IconButton (props) {
  return (
    <button
      css={theme =>
        css`
          color: ${theme.colors.gray500};
          height: 3rem;
          width: 2.5rem;
          z-index: 1;
        `
      }
      type='button'
      {...props}
    />
  )
}

export function Tag (props) {
  return (
    <Link
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: 0.75rem;
        color: ${theme.colors.gray900};
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.5rem;
        padding: 0 0.75rem;

        :hover {
          background-color: ${theme.colors.gray400};
        }
      `}
      {...props}
    />
  )
}
