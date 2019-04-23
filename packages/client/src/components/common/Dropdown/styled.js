import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { OutboundLink } from 'components/common'

export function OptionButton ({ as: Tag, isHighlighted, ...props }) {
  const defaultProps = {
    onClick: e => e.preventDefault()
  }

  if (Tag === 'button') defaultProps.type = 'button'

  if (Tag === OutboundLink || Tag === 'a') {
    defaultProps.rel = 'noopener noreferrer'
    defaultProps.target = '_blank'
  }

  return (
    <Tag
      css={theme => css`
        align-items: center;
        background-color: ${isHighlighted
          ? theme.colors.gray300
          : 'transparent'};
        color: ${theme.colors.gray800};
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
    <ul
      ref={innerRef}
      css={theme => css`
        background-color: #fff;
        border-radius: 8px;
        box-shadow: ${theme.shadows[1]};
        margin-top: 0.25rem;
        overflow: auto;
        position: absolute;
        right: 0;
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
