import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { createCollectionPath } from '../../../gatsby/utils'

export function CollectionTitle ({ id, name }) {
  return (
    <Link
      css={css`
        display: block;
        height: 100%;
        padding: 3.75rem 0 0 2rem;
      `}
      to={createCollectionPath({ id, name })}
    >
      <h3
        css={theme => css`
          color: ${theme.colors.gray700};
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 900;
          line-height: 2rem;
        `}
      >
        {name}
      </h3>
    </Link>
  )
}

export function CollectionWrapper (props) {
  return (
    <div
      css={theme => css`
        border-bottom: 1px solid ${theme.colors.gray400};
        display: flex;
        flex-direction: column;
        height: 12rem;
        justify-content: space-between;
        padding: 2rem 2rem;
      `}
      {...props}
    />
  )
}

export function Difficulty (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.gray700};
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: capitalize;
      `}
      {...props}
    />
  )
}

export function IconButton (props) {
  return (
    <button
      css={theme =>
        css`
          color: ${theme.colors.gray500};
          height: 1.5rem;
          z-index: 1;
        `
      }
      type='button'
      {...props}
    />
  )
}

export function Tag (props) {
  return (
    <Link
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: 0.75rem;
        color: ${theme.colors.gray900};
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.5rem;
        padding: 0 0.75rem;

        :hover {
          background-color: ${theme.colors.gray400};
        }
      `}
      {...props}
    />
  )
}

export function Topic (props) {
  return (
    <Link
      css={theme => css`
        color: ${theme.colors.brand500};
        font-size: 0.875rem;
        text-transform: uppercase;
        font-weight: 700;
        z-index: 1;
      `}
      {...props}
    />
  )
}
