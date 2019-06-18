import React, { Children, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileNavigationHeightInRem,
  screens
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
        width: ${2.5 * childrenCount + 0.5 * (childrenCount - 1)}rem;

        ${screens.desktop} {
          width: ${2.5 * childrenCount}rem;
        }
      `}
    >
      {children}
    </div>
  )
}

ActionBar.propTypes = {
  children: PropTypes.node.isRequired
}

export function Category (props) {
  return (
    <Link
      css={css`
        color: var(--colors-brand500);
        font-size: 0.875rem;
        font-weight: 500;
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
      css={css`
        color: var(--colors-gray800);
        font-size: 0.875rem;
        font-weight: 500;
        text-transform: capitalize;
      `}
      {...props}
    />
  )
}

export function FAB (props) {
  return (
    <button
      css={css`
        background-color: var(--colors-brand500);
        border-radius: 1.5rem;
        bottom: ${mobileNavigationHeightInRem + 1}rem;
        color: var(--colors-white900);
        height: 3rem;
        position: fixed;
        right: 1rem;
        width: 3rem;

        &:hover {
          background-color: var(--colors-brand900);
        }

        ${screens.desktop} {
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
      css={css`
        align-items: center;
        background-color: var(--colors-brand500);
        border-radius: 1.75rem;
        bottom: 2.5rem;
        color: var(--colors-white900);
        display: flex;
        height: 3.5rem;
        justify-content: center;
        position: fixed;
        right: 2.5rem;
        width: 3.5rem;

        &:hover {
          background-color: var(--colors-brand900);
        }

        ${screens.nonDesktop} {
          display: none;
        }
      `}
      rel='noopener noreferrer'
      target='_blank'
      {...props}
    />
  )
}

export { OutboundLink }

export function PrimaryButton ({ large = false, width, ...props }) {
  return (
    <button
      css={css`
        background-color: var(--colors-brand500);
        border-radius: ${large ? 1.5 : 1.25}rem;
        color: #fff;
        font-size: ${large ? 1 : 0.9375}rem;
        font-weight: ${large ? 600 : 500};
        height: ${large ? 3 : 2.5}rem;
        ${large && 'letter-spacing: 1px;'}
        ${!width && `padding: 0 ${large ? 3.5 : 3}rem;`}
        ${width && `width: ${width};`}

        &:hover {
          background-color: var(--colors-brand900);
        }
      `}
      type='button'
      {...props}
    />
  )
}

PrimaryButton.propTypes = {
  large: PropTypes.bool,
  width: PropTypes.string
}

export function ProgressBar ({ percentage, width }) {
  return (
    <div
      css={css`
        background-color: var(--colors-gray200);
        border-radius: 0.25rem;
        width: ${width || '100%'};
      `}
    >
      <div
        css={css`
          background-color: var(--colors-brand500);
          border-radius: 0.25rem;
          height: 0.5rem;
          transition: width 0.75s ease;
          width: ${percentage}%;
        `}
      />
    </div>
  )
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  width: PropTypes.string
}

export function Sidebar ({ isScrollingDown = false, ...props }) {
  return (
    <div
      css={css`
        position: sticky;

        ${screens.nonDesktop} {
          background-color: var(--colors-white900);
          box-shadow: var(--shadows-02);
          top: ${mobileHeaderHeightInRem}rem;
          transform: translateY(
            ${isScrollingDown ? `-${mobileHeaderHeightInRem}rem` : 0}
          );
          transition: transform 0.3s;
          will-change: transform;
          z-index: 100;
        }

        ${screens.desktop} {
          align-self: flex-start;
          margin-top: 5rem;
          top: ${headerHeightInRem + 1}rem;
          width: 22.5%;
        }
      `}
      {...props}
    />
  )
}

Sidebar.propTypes = {
  isScrollingDown: PropTypes.bool
}

export function SkipNav () {
  return (
    <a className='skip-nav' href='#main'>
      Skip to Main Content
    </a>
  )
}

export { default as Spinner } from './Spinner'

export function Tag (props) {
  return (
    <Link
      css={css`
        border-bottom: 1px dotted var(--colors-gray800);
        color: var(--colors-gray800);
        display: block;
        font-size: 0.8125rem;
        font-weight: 500;
        line-height: 1.5rem;

        &:hover {
          border-bottom: 1px solid var(--colors-accent500);
          color: var(--colors-accent500);
        }
      `}
      {...props}
    />
  )
}

export function Title (props) {
  return (
    <span
      css={css`
        color: var(--colors-gray600);
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.5rem;
        padding-left: calc(1rem + 4px);
      `}
      {...props}
    />
  )
}
