import React, { Children, Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileNavigationHeightInRem
} from 'constants/Styles'

import OutboundLink from './OutboundLink'

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
        width: ${2.5 * childrenCount}rem;
      `}
    >
      {children}
    </div>
  )
}

ActionBar.propTypes = {
  children: PropTypes.node.isRequired
}

export const Category = memo(function (props) {
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
})

export const Difficulty = memo(function (props) {
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
})

export { Dropdown, ExposedDropdown } from './Dropdown'

export function FAB (props) {
  return (
    <button
      css={theme => css`
        background-color: ${theme.colors.brand500};
        border-radius: 1.5rem;
        bottom: ${mobileNavigationHeightInRem + 1}rem;
        color: ${theme.colors.white900};
        height: 3rem;
        position: fixed;
        right: 1rem;
        width: 3rem;

        &:hover {
          background-color: ${theme.colors.brand900};
        }

        ${theme.screens.desktop} {
          display: none;
        }
      `}
      type='button'
      {...props}
    />
  )
}

FAB.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export function FABDesktop (props) {
  return (
    <OutboundLink
      css={theme => css`
        align-items: center;
        background-color: ${theme.colors.brand500};
        border-radius: 1.75rem;
        bottom: 2.5rem;
        color: ${theme.colors.white900};
        display: flex;
        height: 3.5rem;
        justify-content: center;
        position: fixed;
        right: 2.5rem;
        width: 3.5rem;

        &:hover {
          background-color: ${theme.colors.brand900};
        }

        ${theme.screens.nonDesktop} {
          display: none;
        }
      `}
      rel='noopener noreferrer'
      target='_blank'
      {...props}
    />
  )
}

export { default as IconButton } from './IconButton'

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

export { OutboundLink }

export function PrimaryButton ({ large, width, ...props }) {
  return (
    <button
      css={theme => css`
        background-color: ${theme.colors.brand500};
        border-radius: ${large ? 1.5 : 1.25}rem;
        color: #fff;
        font-size: ${large ? 1 : 0.9375}rem;
        font-weight: ${large ? 700 : 600};
        height: ${large ? 3 : 2.5}rem;
        ${large && 'letter-spacing: 1px;'}
        ${!width && `padding: 0 ${large ? 3.5 : 3}rem;`}
        ${width && `width: ${width};`}

        &:hover {
          background-color: ${theme.colors.brand900};
        }
      `}
      type='button'
      {...props}
    />
  )
}

PrimaryButton.defaultProps = {
  large: false
}

PrimaryButton.propTypes = {
  large: PropTypes.bool.isRequired,
  width: PropTypes.string
}

export const ProgressBar = memo(function ProgressBar ({ percentage, width }) {
  return (
    <div
      css={theme =>
        css`
          background-color: ${theme.colors.gray300};
          border-radius: 0.25rem;
          width: ${width || '100%'};
        `
      }
    >
      <div
        css={theme =>
          css`
            background-color: ${theme.colors.brand500};
            border-radius: 0.25rem;
            height: 0.5rem;
            transition: width 0.75s ease;
            width: ${percentage}%;
          `
        }
      />
    </div>
  )
})

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  width: PropTypes.string
}

export function Result ({ as: Tag, ...props }) {
  return (
    <Tag
      css={theme => css`
        color: ${theme.colors.gray900};
        display: flex;
        font-size: 1.125rem;
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

Result.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]).isRequired
}

export function Sidebar (props) {
  return (
    <div
      css={theme => css`
        position: sticky;

        ${theme.screens.nonDesktop} {
          background-color: ${theme.colors.white900};
          box-shadow: ${theme.shadows[1]};
          top: ${mobileHeaderHeightInRem}rem;
          z-index: 100;
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

export { default as Spinner } from './Spinner'

export function Tag ({ small, ...props }) {
  return (
    <Link
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

Tag.defaultProps = {
  small: false
}

Tag.propTypes = {
  small: PropTypes.bool.isRequired
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
