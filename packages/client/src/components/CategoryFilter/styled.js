import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { ChevronLeft, ChevronRight } from 'assets/icons'
import { screens } from 'constants/Styles'

export function Category (props) {
  return (
    <Link
      activeStyle={{
        borderColor: 'var(--brand500)',
        color: 'var(--brand500)',
        fontWeight: 600
      }}
      css={css`
        align-items: center;
        color: var(--black900);
        display: inline-flex;
        font-size: 0.9375rem;
        font-weight: 400;
        text-transform: capitalize;

        &:hover {
          color: var(--brand500);
        }

        ${screens.nonDesktop} {
          border-bottom: 2px solid transparent;
          height: 3rem;
          padding: 0 1rem;

          &:hover {
            border-bottom: 2px solid var(--brand500);
          }
        }

        ${screens.desktop} {
          border-left: 4px solid transparent;
          height: 1.5rem;
          padding: 0 0 0 1rem;

          &:hover {
            border-left: 4px solid var(--brand500);
          }
        }
      `}
      {...props}
    />
  )
}

export const scrollButtonWidthInRem = 2.5

export function ScrollButton ({ handleClick, isVisible, side }) {
  return (
    <button
      css={css`
        background-image: ${`var(--gradient-${side})`};
        color: var(--gray600);
        height: 3rem;
        pointer-events: auto;
        visibility: ${isVisible ? 'visible' : 'hidden'};
        width: ${scrollButtonWidthInRem}rem;

        &:active,
        &:hover {
          color: var(--black900);
        }
      `}
      onClick={handleClick}
      type='button'
    >
      {side === 'left' ? <ChevronLeft /> : <ChevronRight />}
    </button>
  )
}

ScrollButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  side: PropTypes.oneOf(['left', 'right']).isRequired
}
