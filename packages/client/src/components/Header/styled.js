import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem
} from 'utils/styles'

const headerStyle = css`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
`

export function HeaderTag (props) {
  return (
    <header
      css={theme => css`
        background-color: ${theme.colors.white};
        height: ${headerHeightInRem}rem;
        ${headerStyle};

        ${theme.screens.nonDesktop} {
          display: none;
        }
      `}
      {...props}
    />
  )
}

export function HeaderWrapper (props) {
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: space-between;
        ${baseWrapper}
      `}
      {...props}
    />
  )
}

export function Input (props) {
  return (
    <input
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: 1.25rem;
        color: ${theme.colors.gray900};
        font-size: 0.9375rem;
        height: 2.5rem;
        padding-left: 1rem;
        width: 100%;

        ::placeholder {
          color: ${theme.colors.gray600};
          opacity: 1;
        }
      `}
      {...props}
    />
  )
}

export function Item ({ isActive, ...props }) {
  return (
    <li
      css={css`
        background-color: ${isActive ? '#fff' : 'transparent'};
      `}
      {...props}
    />
  )
}

export function MobileHeaderTag (props) {
  return (
    <header
      css={theme => css`
        background-color: ${theme.colors.white};
        height: ${mobileHeaderHeightInRem}rem;
        ${headerStyle};

        ${theme.screens.desktop} {
          display: none;
        }
      `}
      {...props}
    />
  )
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
      css={theme => css`
        display: none;

        ${theme.screens.desktop} {
          display: block;
          position: relative;
          width: 30rem;
        }
      `}
      ref={innerRef}
      {...props}
    />
  )
}
