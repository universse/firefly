import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  screens
} from 'constants/Styles'

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

export function HeaderTag ({
  isScrollingDown = false,
  mobile = false,
  ...props
}) {
  return (
    <header
      css={css`
        background-color: var(--colors-white900);
        display: ${mobile ? 'none' : 'block'};
        height: ${headerHeightInRem}rem;
        position: ${mobile ? 'sticky' : 'fixed'};
        top: 0;
        width: 100%;
        z-index: 200;

        ${screens.nonDesktop} {
          display: ${mobile ? 'block' : 'none'};
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

HeaderTag.propTypes = {
  isScrollingDown: PropTypes.bool,
  mobile: PropTypes.bool
}

export function HeaderWrapper ({ shadow = false, ...props }) {
  return (
    <div
      className='base'
      css={css`
        align-items: center;
        box-shadow: ${shadow ? 'var(--shadows-02)' : 'none'};
        display: flex;
        height: 100%;
        justify-content: space-between;
      `}
      {...props}
    />
  )
}

HeaderWrapper.propTypes = {
  shadow: PropTypes.bool
}

export function Input (props) {
  return (
    <input
      autoComplete='off'
      css={css`
        background-color: var(--colors-gray300);
        border-radius: 1.25rem;
        color: var(--colors-gray900);
        font-size: 0.9375rem;
        height: 2.5rem;
        padding-left: 1rem;
        width: 100%;

        ::placeholder {
          color: var(--colors-gray700);
          opacity: 1;
        }
      `}
      type='text'
      {...props}
    />
  )
}

export function Result ({ as: Tag = Link, isHighlighted = false, ...props }) {
  return (
    <Tag
      css={css`
        background-color: ${isHighlighted ? '#fff' : 'transparent'};
        color: var(--colors-gray900);
        display: flex;
        font-size: 0.9375rem;
        font-weight: 500;
        line-height: 2.5rem;
        padding: 0 0 0 1rem;
        width: 100%;
      `}
      {...props}
    />
  )
}

Result.propTypes = {
  as: PropTypes.oneOf(['span', Link]),
  isHighlighted: PropTypes.bool
}

export function ResultBox ({ innerRef, ...props }) {
  return (
    <div
      ref={innerRef}
      css={css`
        background-color: var(--colors-gray300);
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

ResultBox.propTypes = {
  innerRef: PropTypes.func.isRequired
}

export function Root ({ innerRef, ...props }) {
  return (
    <div
      ref={innerRef}
      css={css`
        display: block;
        position: relative;
        width: 27rem;
      `}
      {...props}
    />
  )
}

Root.propTypes = {
  innerRef: PropTypes.func.isRequired
}
