import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { headerHeightInRem } from 'utils/styles'

export function Category (props) {
  return (
    <Link
      css={theme => css`
        color: ${theme.colors.brand500};
        font-size: 0.875rem;
        text-transform: uppercase;
        font-weight: 600;
        z-index: 1;

        &:hover {
          text-decoration: underline;
        }
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

export function Input (props) {
  return (
    <input
      css={theme => css`
        background-color: transparent;
        border-bottom: 1px solid ${theme.colors.gray400};
        color: ${theme.colors.gray900};
        font-size: 1rem;
        height: 2rem;
        padding-left: 1rem;
        width: 100%;

        ::placeholder {
          color: ${theme.colors.gray600};
          opacity: 1;
        }

        &:focus {
          border-bottom: 1px solid ${theme.colors.gray500};
        }

        ${theme.screens.desktop} {
          font-size: 1.25rem;
          height: 3rem;
        }
      `}
      {...props}
    />
  )
}

export function Result ({ as: Tag, ...props }) {
  return (
    <Tag
      css={theme => css`
        color: ${theme.colors.gray900};
        display: flex;
        font-size: 1rem;
        line-height: 2.5rem;
        padding: 0 0 0 1rem;

        &:hover {
          color: ${theme.colors.brand500};
          text-decoration: underline;
        }

        ${theme.screens.desktop} {
          font-size: 1.25rem;
          line-height: 3rem;
        }
      `}
      {...props}
    />
  )
}

Result.defaultProps = {
  as: Link
}

export function Sidebar (props) {
  return (
    <div
      css={theme => css`
        position: sticky;

        ${theme.screens.nonDesktop} {
          background-color: ${theme.colors.white};
          box-shadow: ${theme.shadows.subtle};
          top: 0;
          z-index: 500;
        }

        ${theme.screens.desktop} {
          align-self: flex-start;
          padding-top: 1rem;
          top: ${headerHeightInRem}rem;
          width: 25%;
        }
      `}
      {...props}
    />
  )
}

export function Tag (props) {
  return (
    // eslint-disable-next-line
    <a
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: 0.75rem;
        color: ${theme.colors.gray900};
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.5rem;
        padding: 0 0.75rem;

        &:hover {
          background-color: ${theme.colors.gray400};
        }
      `}
      {...props}
    />
  )
}

export function Title (props) {
  return (
    <span
      css={theme =>
        css`
          color: ${theme.colors.gray500};
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          line-height: 1.25rem;
          padding-left: calc(1rem + 4px);
        `
      }
      {...props}
    />
  )
}
