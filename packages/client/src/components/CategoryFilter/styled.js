import React, { memo, useContext } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { ChevronLeft, ChevronRight } from 'icons'
import { URLUtilsContext } from 'pages'

export function Category ({ active, category, handleClick, to }) {
  const { onFilterClick } = useContext(URLUtilsContext)

  return (
    <Link
      css={theme => css`
        align-items: center;
        border-bottom: 3px solid transparent;
        color: ${theme.colors.gray900};
        display: inline-flex;
        font-size: 1rem;
        height: 3.5rem;
        margin: 0.25rem;
        padding: 0 0.75rem;
        text-transform: capitalize;
        ${active &&
          css`
            border-bottom: 3px solid ${theme.colors.brand500};
            color: ${theme.colors.brand500};
            font-weight: 700;
          `};

        &:hover {
          border-bottom: 3px solid ${theme.colors.brand500};
          color: ${theme.colors.brand500};
        }

        ${theme.screens.desktop} {
          border-bottom: none;
          border-left: 4px solid transparent;
          height: 2rem;
          margin: 0.25rem 0;
          padding: 0 0 0 1rem;
          ${active &&
            css`
              border-bottom: none;
              border-left: 4px solid ${theme.colors.brand500};
            `};

          &:hover {
            border-bottom: none;
            border-left: 4px solid ${theme.colors.brand500};
          }
        }
      `}
      onClick={onFilterClick}
      to={to}
    >
      {category}
    </Link>
  )
}

function Scroll ({ display, handleClick, side }) {
  const align =
    side === 'left'
      ? css`
          left: 0;
        `
      : css`
          justify-content: flex-end;
          right: 0;
        `

  return (
    <div
      css={theme => css`
        align-items: center;
        display: ${display ? 'flex' : 'none'};
        position: absolute;
        top: 0;
        ${align};
      `}
    >
      <button
        css={theme =>
          css`
            background-image: ${theme.gradients[side]};
            color: ${theme.colors.gray500};
            height: 4rem;
            width: 2.5rem;

            &:focus,
            &:hover {
              color: #000;
            }
          `
        }
        onClick={handleClick}
      >
        {side === 'left' ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  )
}

export const ScrollButton = memo(Scroll)

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

export function Wrapper (props) {
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
          display: inline-block;
          padding-top: 1rem;
          top: 4rem;
          vertical-align: top;
          width: 30%;
        }
      `}
      {...props}
    />
  )
}
