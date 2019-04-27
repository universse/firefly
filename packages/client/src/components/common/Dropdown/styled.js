import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { OutboundLink } from 'components/common'

export function OptionButton ({ as: Tag, isHighlighted, ...props }) {
  const defaultProps = {}

  if (Tag === 'button') {
    defaultProps.type = 'button'
  }

  if (Tag === OutboundLink || Tag === 'a') {
    defaultProps.rel = 'noopener noreferrer'
    defaultProps.target = '_blank'
  }

  return (
    <Tag
      css={css`
        align-items: center;
        background-color: ${isHighlighted
          ? 'var(--colors-gray300)'
          : 'transparent'};
        color: var(--colors-gray800);
        display: flex;
        font-size: 0.875rem;
        font-weight: 400;
        height: 2.5rem;
        padding-left: 1rem;
        text-align: left;
        width: 11.5rem;
      `}
      {...props}
      {...defaultProps}
    />
  )
}

OptionButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]).isRequired,
  isHighlighted: PropTypes.bool.isRequired
}

export function OptionList ({ innerRef, ...props }) {
  return (
    <div
      ref={innerRef}
      css={css`
        background-color: #fff;
        border-radius: 8px;
        box-shadow: var(--shadows-02);
        margin-top: 0.25rem;
        overflow: auto;
        position: absolute;
        right: 0;
        width: 11.5rem;
        z-index: 2;
      `}
      {...props}
    />
  )
}

OptionList.propTypes = {
  innerRef: PropTypes.func.isRequired
}

export function Root ({ innerRef, ...props }) {
  return (
    <div
      ref={innerRef}
      css={css`
        position: relative;
      `}
      {...props}
    />
  )
}

Root.propTypes = {
  innerRef: PropTypes.func.isRequired
}
