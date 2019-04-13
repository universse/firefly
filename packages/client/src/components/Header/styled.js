import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { headerHeightInRem, mobileHeaderHeightInRem } from 'constants/Styles'

export function ClearSearchWrapper (props) {
  return (
    <div
      css={css`
        position: absolute;
        right: 0.25rem;
        top: -0.25rem;
      `}
      {...props}
    />
  )
}

export function HeaderTag ({ isScrollingDown, ...props }) {
  return (
    <header
      css={theme => css`
        background-color: ${theme.colors.white900};
        height: ${headerHeightInRem}rem;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 200;

        ${theme.screens.nonDesktop} {
          height: ${mobileHeaderHeightInRem}rem;
          transform: translateY(${isScrollingDown ? '-100%' : 0});
          transition: transform 0.3s;
          will-change: transform;
        }
      `}
      {...props}
    />
  )
}

HeaderTag.defaultProps = {
  isScrollingDown: false
}

HeaderTag.propTypes = {
  isScrollingDown: PropTypes.bool
}

export function HeaderWrapper ({ shadow, ...props }) {
  return (
    <div
      className='base'
      css={theme => css`
        align-items: center;
        box-shadow: ${shadow ? theme.shadows[1] : 'none'};
        display: flex;
        height: 100%;
        justify-content: space-between;
      `}
      {...props}
    />
  )
}

HeaderWrapper.defaultProps = {
  shadow: false
}

HeaderWrapper.propTypes = {
  shadow: PropTypes.bool
}

export function Input (props) {
  return (
    <input
      autoComplete='off'
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: 1.25rem;
        color: ${theme.colors.gray900};
        font-size: 0.9375rem;
        height: 2.5rem;
        padding-left: 1rem;
        width: 100%;

        ::placeholder {
          color: ${theme.colors.gray700};
          opacity: 1;
        }
      `}
      type='text'
      {...props}
    />
  )
}

export function Item ({ isHighlighted, ...props }) {
  return (
    <li
      css={css`
        background-color: ${isHighlighted ? '#fff' : 'transparent'};
      `}
      {...props}
    />
  )
}

Item.propTypes = {
  isHighlighted: PropTypes.bool.isRequired
}

export function Result ({ as: Tag, ...props }) {
  return (
    <Tag
      css={theme => css`
        color: ${theme.colors.gray900};
        display: flex;
        font-size: 0.9375rem;
        font-weight: 600;
        line-height: 2.5rem;
        padding: 0 0 0 1rem;
      `}
      {...props}
    />
  )
}

Result.defaultProps = {
  as: Link
}

Result.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
}

export function ResultBox (props) {
  return (
    <div
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-bottom-left-radius: 1.25rem;
        border-bottom-right-radius: 1.25rem;
        overflow: auto;
        padding: 1.25rem 0 0 0;
        position: absolute;
        top: 1.25rem;
        width: 100%;
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
        display: block;
        position: relative;
        width: 28rem;
      `}
      {...props}
    />
  )
}

Root.propTypes = {
  innerRef: PropTypes.func.isRequired
}
