import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { ChevronLeft, ChevronRight } from 'icons'
import { screens } from 'constants/Styles'

export const activeStyle = {
  borderColor: 'var(--colors-brand500)',
  color: 'var(--colors-brand500)',
  fontWeight: 600
}

export function Category (props) {
  return (
    <Link
      activeStyle={activeStyle}
      css={css`
        align-items: center;
        color: var(--colors-gray900);
        display: inline-flex;
        font-size: 0.9375rem;
        font-weight: 400;
        text-transform: capitalize;

        &:hover {
          color: var(--colors-brand500);
        }

        ${screens.nonDesktop} {
          border-bottom: 2px solid transparent;
          height: 3rem;
          padding: 0 1rem;

          &:hover {
            border-bottom: 2px solid var(--colors-brand500);
          }
        }

        ${screens.desktop} {
          border-left: 4px solid transparent;
          height: 1.5rem;
          padding: 0 0 0 1rem;

          &:hover {
            border-left: 4px solid var(--colors-brand500);
          }
        }
      `}
      partiallyActive
      {...props}
    />
  )
}

export const ScrollButton = memo(function ({ handleClick, isShown, side }) {
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
      css={css`
        align-items: center;
        display: ${isShown ? 'flex' : 'none'};
        ${align};
        position: absolute;
        top: 0;
      `}
    >
      <button
        css={css`
          background-image: ${`var(--gradient-${side})`};
          color: var(--colors-gray500);
          height: 3rem;
          width: 2.5rem;

          &:focus,
          &:hover {
            color: var(--colors-gray900);
          }
        `}
        onClick={handleClick}
        type='button'
      >
        {side === 'left' ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  )
})

ScrollButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  side: PropTypes.oneOf(['left', 'right'])
}
