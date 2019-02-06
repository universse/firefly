import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

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
