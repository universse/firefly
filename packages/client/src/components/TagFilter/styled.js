import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { screens } from 'constants/Styles'

export function ClearFilterButton (props) {
  return (
    <button
      css={css`
        color: var(--black500);
        font-size: 0.875rem;

        &:hover {
          color: var(--black900);
          text-decoration: underline;
        }
      `}
      type='button'
      {...props}
    />
  )
}

export function Count ({ isSelected, ...props }) {
  return (
    <span
      css={css`
        color: var(--black900);
        font-size: 0.875rem;
        line-height: 1.25rem;

        ${screens.nonDesktop} {
          color: inherit;
          font-size: inherit;
          margin-left: 0.75rem;
        }

        ${screens.desktop} {
          font-weight: ${isSelected ? 600 : 400};
        }
      `}
      {...props}
    />
  )
}

Count.propTypes = {
  isSelected: PropTypes.bool.isRequired
}

export function MobileTag ({ isActive, ...props }) {
  return (
    // eslint-disable-next-line
    <a
      css={css`
        background-color: ${isActive ? 'var(--black900)' : 'transparent'};
        border: ${isActive ? 'none' : '1px solid var(--black300)'};
        border-radius: 1rem;
        color: ${isActive ? 'var(--white900)' : 'var(--black900)'};
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 2rem;
        padding: 0 0.75rem;
      `}
      {...props}
    />
  )
}

MobileTag.propTypes = {
  isActive: PropTypes.bool.isRequired
}
