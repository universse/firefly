import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { ChevronLeft, ChevronRight } from 'icons'

export function Category ({ isActive, ...props }) {
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
          border-bottom: 2px solid
            ${isActive ? theme.colors.brand500 : 'transparent'};
          height: 3rem;
          padding: 0 1rem;

          &:hover {
            border-bottom: 2px solid ${theme.colors.brand500};
          }
        }

        ${theme.screens.desktop} {
          border-left: 4px solid
            ${isActive ? theme.colors.brand500 : 'transparent'};
          height: 1.5rem;
          padding: 0 0 0 1rem;

          &:hover {
            border-left: 4px solid ${theme.colors.brand500};
          }
        }
      `}
      {...props}
    />
  )
}

Category.propTypes = {
  isActive: PropTypes.bool.isRequired
}

export const ScrollButton = memo(function ({ display, handleClick, side }) {
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
        ${align};
        position: absolute;
        top: 0;
      `}
    >
      <button
        css={theme =>
          css`
            background-image: ${theme.gradients[side]};
            color: ${theme.colors.gray500};
            height: 3rem;
            width: 2.5rem;

            &:focus,
            &:hover {
              color: #000;
            }
          `
        }
        onClick={handleClick}
        type='button'
      >
        {side === 'left' ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  )
})

ScrollButton.propTypes = {
  display: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  side: PropTypes.oneOf(['left', 'right'])
}
