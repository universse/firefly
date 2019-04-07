import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { ThemeContext, css } from '@emotion/core'

import { mobileNavigationHeightInRem } from 'constants/Styles'

export function GhostButton (props) {
  return (
    <button
      css={theme => css`
        align-items: center;
        border: 2px solid ${theme.colors.brand500};
        border-radius: 1rem;
        color: ${theme.colors.brand500};
        display: flex;
        font-size: 0.9375rem;
        font-weight: 700;
        height: 2rem;
        padding: 0 1rem;

        &:hover {
          background-color: ${theme.colors.brand500};
          color: #fff;
        }
      `}
      type='button'
      {...props}
    />
  )
}

export function MobileNavLink ({ isActive, label, Icon, ...props }) {
  return (
    <Link
      css={theme => css`
        align-items: center;
        color: ${isActive ? theme.colors.brand500 : theme.colors.gray500};
        display: flex;
        flex-direction: column;
        height: ${mobileNavigationHeightInRem}rem;
        padding: 0.5rem 0 0.5rem;
      `}
      {...props}
    >
      <div
        css={css`
          margin-bottom: 0.25rem;
        `}
      >
        <Icon />
      </div>
      <span
        css={css`
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        `}
      >
        {label}
      </span>
    </Link>
  )
}

MobileNavLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
}

export function NavLink (props) {
  const theme = useContext(ThemeContext)

  return (
    <Link
      activeStyle={{ borderBottom: `2px solid ${theme.colors.brand500}` }}
      css={theme => css`
        align-items: center;
        border-bottom: 2px solid transparent;
        color: ${theme.colors.gray900};
        display: flex;
        font-size: 0.9375rem;
        font-weight: 600;
        height: 2rem;

        &:hover {
          border-bottom: 2px solid ${theme.colors.brand500};
        }
      `}
      {...props}
    />
  )
}
