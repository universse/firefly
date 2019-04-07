import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

export const OptionButton = memo(function ({
  as: Tag,
  isHighlighted,
  ...props
}) {
  const defaultProps =
    Tag === 'a'
      ? { rel: 'noopener noreferrer', target: '_blank' }
      : Tag === 'button'
      ? { type: 'button' }
      : {}

  return (
    <Tag
      css={theme => css`
        align-items: center;
        background-color: ${isHighlighted
          ? theme.colors.gray300
          : 'transparent'};
        color: ${theme.colors.gray700};
        display: flex;
        font-size: 0.875rem;
        font-weight: 400;
        height: 2.5rem;
        padding-left: 1rem;
        text-align: left;
        width: 11.5rem;
      `}
      tabIndex='-1'
      {...defaultProps}
      {...props}
    />
  )
})

OptionButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]).isRequired,
  isHighlighted: PropTypes.bool.isRequired
}

export function OptionList (props) {
  return (
    <ul
      css={theme => css`
        background-color: #fff;
        border-radius: 8px;
        box-shadow: ${theme.shadows[1]};
        margin-top: 0.25rem;
        position: absolute;
        right: 0;
        z-index: 2;
      `}
      {...props}
    />
  )
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
