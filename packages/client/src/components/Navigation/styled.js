import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { ThemeContext, css } from '@emotion/core'

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

export function PrimaryButton (props) {
  return (
    <button
      css={theme => css`
        align-items: center;
        background-color: ${theme.colors.brand500};
        border-radius: 1rem;
        color: #fff;
        display: flex;
        font-size: 0.9375rem;
        border-bottom: 1px solid transparent;
        font-weight: 700;
        height: 2rem;
        padding: 0 1rem;

        &:hover {
          background-color: ${theme.colors.brand900};
        }
      `}
      type='button'
      {...props}
    />
  )
}
