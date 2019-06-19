import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { screens } from 'constants/Styles'

export function ClearFilterButton (props) {
  return (
    <button
      css={css`
        color: var(--colors-gray500);
        font-size: 0.875rem;

        &:hover {
          color: var(--colors-gray900);
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
      css={css`
        color: var(--colors-gray900);
        font-size: 0.875rem;
        line-height: 1.25rem;

        ${screens.nonDesktop} {
          color: inherit;
          font-size: inherit;
          margin-left: 0.75rem;
        }

        ${screens.desktop} {
          font-weight: ${isActive ? 600 : 400};
        }
      `}
      {...props}
    />
  )
}

Count.propTypes = {
  isActive: PropTypes.bool.isRequired
}

export function MobileTag ({ isActive, ...props }) {
  return (
    // eslint-disable-next-line
    <a
      css={css`
        background-color: ${isActive ? 'var(--colors-gray900)' : 'transparent'};
        border: ${isActive ? 'none' : '1px solid var(--colors-gray300)'};
        border-radius: 1rem;
        color: ${isActive ? 'var(--colors-white900)' : 'var(--colors-gray900)'};
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

export function Tag ({ isActive, ...props }) {
  return (
    // eslint-disable-next-line
    <a
      css={css`
        color: var(--colors-gray900);
        display: block;
        font-size: 0.9375rem;
        font-weight: ${isActive ? 600 : 400};
        line-height: 1.25rem;

        &:hover {
          color: ${isActive
            ? 'var(--colors-gray900)'
            : 'var(--colors-brand500)'};
        }
      `}
      {...props}
    />
  )
}

Tag.propTypes = {
  isActive: PropTypes.bool.isRequired
}
