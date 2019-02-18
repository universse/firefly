import React, { memo } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { ChevronLeft, ChevronRight } from 'icons'

export function Category ({ isActive, category, handleClick, to }) {
  return (
    <Link
      css={theme => css`
        align-items: center;
        color: ${isActive ? theme.colors.brand500 : theme.colors.gray900};
        display: inline-flex;
        font-size: 1rem;
        font-weight: ${isActive ? 700 : 400};
        text-transform: capitalize;

        &:hover {
          color: ${theme.colors.brand500};
        }

        ${theme.screens.nonDesktop} {
          border-bottom: 3px solid
            ${isActive ? theme.colors.brand500 : 'transparent'};
          height: 3.5rem;
          margin: 0.25rem;
          padding: 0 0.75rem;

          &:hover {
            border-bottom: 3px solid ${theme.colors.brand500};
          }
        }

        ${theme.screens.desktop} {
          border-left: 4px solid
            ${isActive ? theme.colors.brand500 : 'transparent'};
          height: 1.5rem;
          margin: 0.25rem 0;
          padding: 0 0 0 1rem;

          &:hover {
            border-left: 4px solid ${theme.colors.brand500};
          }
        }
      `}
      onClick={handleClick}
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
