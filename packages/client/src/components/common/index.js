import React, { Children, Fragment, forwardRef } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileNavigationHeightInRem
} from 'utils/styles'

export function ActionBar ({ children }) {
  const childrenCount =
    children.type === Fragment
      ? Children.count(children.props.children)
      : Children.count(children)

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        margin-right: -0.5rem;
        width: ${2.5 * childrenCount + 0.5 * (childrenCount - 1)}rem;
      `}
    >
      {children}
    </div>
  )
}

export function Category (props) {
  return (
    <Link
      css={theme => css`
        color: ${theme.colors.brand500};
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: capitalize;
        z-index: 1;

        &:hover {
          text-decoration: underline;
        }
      `}
      {...props}
    />
  )
}

export function Difficulty (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.gray800};
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: capitalize;
      `}
      {...props}
    />
  )
}

export { default as Dropdown } from './Dropdown'

export function FAB (props) {
  return (
    <button
      css={theme => css`
        background-color: ${theme.colors.brand500};
        border-radius: 1.5rem;
        bottom: ${mobileNavigationHeightInRem + 1}rem;
        height: 3rem;
        position: fixed;
        right: 1rem;
        width: 3rem;
      `}
      type='button'
      {...props}
    />
  )
}

export function Heading ({ as, serif, ...props }) {
  const Tag = as || 'h1'
  return (
    <Tag
      css={css`
        font-size: 1rem;
        font-weight: 2rem;
      `}
      {...props}
    />
  )
}

export const IconButton = forwardRef(function ({ children, ...props }, ref) {
  return (
    <button
      ref={ref}
      css={theme =>
        css`
          color: ${theme.colors.gray500};
          height: 3rem;
          width: 2.5rem;
          z-index: 1;
        `
      }
      type='button'
      {...props}
    >
      <div
        css={theme => css`
          align-items: center;
          border-radius: 50%;
          display: flex;
          height: 2.5rem;
          justify-content: space-around;
          width: 2.5rem;

          &:hover {
            background-color: ${theme.colors.gray300};
          }
        `}
      >
        {children}
      </div>
    </button>
  )
})

export function Input (props) {
  return (
    <input
      autoComplete='off'
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: 1.25rem;
        color: ${theme.colors.gray900};
        font-size: 1rem;
        height: 2.5rem;
        padding-left: 3.25rem;
        width: 100%;

        ::placeholder {
          color: ${theme.colors.gray700};
          opacity: 1;
        }

        ${theme.screens.desktop} {
          border-radius: 1.5rem;
          font-size: 1.25rem;
          height: 3rem;
        }
      `}
      type='text'
      {...props}
    />
  )
}

export function PrimaryButton (props) {
  return (
    <button
      css={theme => css`
        background-color: ${theme.colors.brand500};
        border-bottom: 1px solid transparent;
        border-radius: 1.25rem;
        color: #fff;
        font-size: 0.9375rem;
        font-weight: 700;
        height: 2.5rem;
        padding: 0 3rem;

        &:hover {
          background-color: ${theme.colors.brand900};
        }
      `}
      type='button'
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
        font-size: 1.125rem;
        font-weight: 600;
        line-height: 2.5rem;
        padding-left: 1rem;

        &:hover {
          color: ${theme.colors.brand500};
          text-decoration: underline;
        }

        ${theme.screens.desktop} {
          font-size: 1.25rem;
          line-height: 3rem;
        }
      `}
      {...props}
    />
  )
}

Result.defaultProps = {
  as: Link
}

export function Sidebar (props) {
  return (
    <div
      css={theme => css`
        position: sticky;

        ${theme.screens.nonDesktop} {
          background-color: ${theme.colors.white};
          box-shadow: ${theme.shadows[1]};
          top: ${mobileHeaderHeightInRem}rem;
          z-index: 500;
        }

        ${theme.screens.desktop} {
          align-self: flex-start;
          margin-top: 2.25rem;
          top: ${headerHeightInRem}rem;
          width: 22.5%;
        }
      `}
      {...props}
    />
  )
}

export function Tag ({ small, ...props }) {
  return (
    // eslint-disable-next-line
    <a
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: ${small ? 0.625 : 0.75}rem;
        color: ${theme.colors.gray900};
        display: block;
        font-size: 0.8125rem;
        font-weight: 600;
        line-height: ${small ? 1.25 : 1.5}rem;
        padding: 0 0.75rem;

        &:hover {
          background-color: ${theme.colors.gray400};
        }
      `}
      {...props}
    />
  )
}

export function Title (props) {
  return (
    <span
      css={theme =>
        css`
          color: ${theme.colors.gray500};
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          line-height: 1.5rem;
          padding-left: calc(1rem + 4px);
        `
      }
      {...props}
    />
  )
}
